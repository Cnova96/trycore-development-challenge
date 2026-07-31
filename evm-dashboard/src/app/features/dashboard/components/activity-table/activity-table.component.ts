import { DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivityWithEvm } from '../../../../core/models/evm.model';

@Component({
  selector: 'app-activity-table',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './activity-table.component.html',
  styleUrl: './activity-table.component.scss',
})
export class ActivityTableComponent {
  readonly activityMetrics = input.required<ActivityWithEvm[]>();
  readonly savingActivityId = input<string | null>(null);

  readonly activityChanged = output<{ id: string; field: string; value: string | number }>();
  readonly activitySaved = output<string>();
  readonly activityDeleted = output<string>();

  onFieldChange(id: string, field: string, value: string | number): void {
    this.activityChanged.emit({ id, field, value });
  }

  onSave(id: string): void {
    this.activitySaved.emit(id);
  }

  onDelete(id: string): void {
    this.activityDeleted.emit(id);
  }
}
