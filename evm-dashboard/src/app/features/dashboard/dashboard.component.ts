import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivityTableComponent } from './components/activity-table/activity-table.component';
import { ConsolidatedKpisComponent } from './components/consolidated-kpis/consolidated-kpis.component';
import { CpiSpiIndicatorsComponent } from './components/cpi-spi-indicators/cpi-spi-indicators.component';
import { EvmChartComponent } from './components/evm-chart/evm-chart.component';
import { DashboardFacadeService } from './services/dashboard-facade.service';
import { DashboardStateService } from './services/dashboard-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    ActivityTableComponent,
    ConsolidatedKpisComponent,
    CpiSpiIndicatorsComponent,
    EvmChartComponent,
  ],
  providers: [DashboardStateService, DashboardFacadeService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly facade = inject(DashboardFacadeService);

  readonly projects = this.facade.projects;
  readonly selectedProjectId = this.facade.selectedProjectId;
  readonly selectedProject = this.facade.selectedProject;
  readonly activityMetrics = this.facade.activityMetrics;
  readonly consolidatedMetrics = this.facade.consolidatedMetrics;
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly savingActivityId = this.facade.savingActivityId;

  ngOnInit(): void {
    void this.facade.initialize();
  }

  onProjectChange(projectId: string): void {
    void this.facade.selectProject(projectId);
  }

  onActivityChanged(event: {
    id: string;
    field: string;
    value: string | number;
  }): void {
    this.facade.updateActivityLocally(event.id, {
      [event.field]: event.value,
    } as never);
  }

  onActivitySaved(activityId: string): void {
    const activity = this.facade
      .activityMetrics()
      .find((item) => item.activity.id === activityId)?.activity;

    if (activity) {
      void this.facade.saveActivity(activity);
    }
  }

  onActivityDeleted(activityId: string): void {
    void this.facade.deleteActivity(activityId);
  }

  onAddActivity(): void {
    const projectId = this.selectedProjectId();
    if (projectId) {
      void this.facade.addActivity(projectId);
    }
  }
}
