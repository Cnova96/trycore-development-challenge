import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { EvmMetrics } from '../../../../core/models/evm.model';

@Component({
  selector: 'app-consolidated-kpis',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './consolidated-kpis.component.html',
  styleUrl: './consolidated-kpis.component.scss',
})
export class ConsolidatedKpisComponent {
  readonly metrics = input.required<EvmMetrics>();
}
