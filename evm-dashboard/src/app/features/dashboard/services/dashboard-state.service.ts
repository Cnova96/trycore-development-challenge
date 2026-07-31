import { Injectable, computed, signal } from '@angular/core';
import {
  Activity,
  ActivityWithEvm,
  EvmMetrics,
  Project,
} from '../../../core/models/evm.model';
import {
  calculateConsolidatedEvm,
  calculateEvmFromActivity,
} from '../../../core/utils/evm-calculator';

@Injectable()
export class DashboardStateService {
  readonly projects = signal<Project[]>([]);
  readonly selectedProjectId = signal<string | null>(null);
  readonly activities = signal<Activity[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly savingActivityId = signal<string | null>(null);

  readonly selectedProject = computed(() =>
    this.projects().find((project) => project.id === this.selectedProjectId()) ??
    null,
  );

  readonly activityMetrics = computed<ActivityWithEvm[]>(() =>
    this.activities().map((activity) => ({
      activity,
      evm: calculateEvmFromActivity(activity),
    })),
  );

  readonly consolidatedMetrics = computed<EvmMetrics>(() =>
    calculateConsolidatedEvm(this.activities()),
  );

  setProjects(projects: Project[]): void {
    this.projects.set(projects);
  }

  selectProject(projectId: string): void {
    this.selectedProjectId.set(projectId);
  }

  setActivities(activities: Activity[]): void {
    this.activities.set(activities);
  }

  updateLocalActivity(activityId: string, changes: Partial<Activity>): void {
    this.activities.update((items) =>
      items.map((item) =>
        item.id === activityId ? { ...item, ...changes } : item,
      ),
    );
  }

  addLocalActivity(activity: Activity): void {
    this.activities.update((items) => [...items, activity]);
  }

  removeLocalActivity(activityId: string): void {
    this.activities.update((items) =>
      items.filter((item) => item.id !== activityId),
    );
  }
}
