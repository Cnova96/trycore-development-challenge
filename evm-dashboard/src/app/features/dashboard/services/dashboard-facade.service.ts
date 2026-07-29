import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ActivityApiService } from '../../../core/services/activity-api.service';
import { ProjectApiService } from '../../../core/services/project-api.service';
import { Activity } from '../../../core/models/evm.model';
import { DashboardStateService } from './dashboard-state.service';

@Injectable()
export class DashboardFacadeService {
  private readonly projectApi = inject(ProjectApiService);
  private readonly activityApi = inject(ActivityApiService);
  private readonly state = inject(DashboardStateService);

  readonly projects = this.state.projects;
  readonly selectedProjectId = this.state.selectedProjectId;
  readonly selectedProject = this.state.selectedProject;
  readonly activityMetrics = this.state.activityMetrics;
  readonly consolidatedMetrics = this.state.consolidatedMetrics;
  readonly loading = this.state.loading;
  readonly error = this.state.error;
  readonly savingActivityId = this.state.savingActivityId;

  async initialize(): Promise<void> {
    this.state.loading.set(true);
    this.state.error.set(null);

    try {
      const projects = await firstValueFrom(this.projectApi.getProjects());
      this.state.setProjects(projects);

      if (projects.length === 0) {
        const project = await firstValueFrom(
          this.projectApi.createProject('Proyecto demo', 'Proyecto inicial'),
        );
        this.state.setProjects([project]);
        await this.loadProject(project.id);
        return;
      }

      await this.loadProject(projects[0].id);
    } catch {
      this.state.error.set('No se pudo cargar la información del proyecto.');
    } finally {
      this.state.loading.set(false);
    }
  }

  async selectProject(projectId: string): Promise<void> {
    this.state.loading.set(true);
    this.state.error.set(null);

    try {
      await this.loadProject(projectId);
    } catch {
      this.state.error.set('No se pudo cargar el análisis del proyecto.');
    } finally {
      this.state.loading.set(false);
    }
  }

  updateActivityLocally(activityId: string, changes: Partial<Activity>): void {
    this.state.updateLocalActivity(activityId, changes);
  }

  async saveActivity(activity: Activity): Promise<void> {
    if (!activity.id) {
      return;
    }

    this.state.savingActivityId.set(activity.id);

    try {
      const updated = await firstValueFrom(
        this.activityApi.update(activity.id, {
          name: activity.name,
          bac: activity.bac,
          plannedPercent: activity.plannedPercent,
          executedPercent: activity.executedPercent,
          actualCost: activity.actualCost,
          startDate: activity.startDate,
          endDate: activity.endDate,
        }),
      );
      this.state.updateLocalActivity(activity.id, updated);
    } catch {
      this.state.error.set('No se pudo guardar la actividad.');
    } finally {
      this.state.savingActivityId.set(null);
    }
  }

  async addActivity(projectId: string): Promise<void> {
    const today = new Date().toISOString().slice(0, 10);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    try {
      const created = await firstValueFrom(
        this.activityApi.create({
          name: 'Nueva actividad',
          bac: 10000,
          plannedPercent: 0,
          executedPercent: 0,
          actualCost: 0,
          startDate: today,
          endDate: endDate.toISOString().slice(0, 10),
          projectId,
        }),
      );
      this.state.addLocalActivity(created);
    } catch {
      this.state.error.set('No se pudo crear la actividad.');
    }
  }

  async deleteActivity(activityId: string): Promise<void> {
    try {
      await firstValueFrom(this.activityApi.delete(activityId));
      this.state.removeLocalActivity(activityId);
    } catch {
      this.state.error.set('No se pudo eliminar la actividad.');
    }
  }

  private async loadProject(projectId: string): Promise<void> {
    this.state.selectProject(projectId);
    const analysis = await firstValueFrom(
      this.projectApi.getEvmAnalysis(projectId),
    );
    this.state.setActivities(analysis.activities.map((item) => item.activity));
  }
}
