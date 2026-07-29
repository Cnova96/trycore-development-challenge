import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { EvmMetrics } from '../../../../core/models/evm.model';
import {
  EvmStatus,
  getIndexStatus,
  getStatusLabel,
} from '../../../../core/utils/evm-status.util';

@Component({
  selector: 'app-cpi-spi-indicators',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './cpi-spi-indicators.component.html',
  styleUrl: './cpi-spi-indicators.component.scss',
})
export class CpiSpiIndicatorsComponent {
  readonly metrics = input.required<EvmMetrics>();

  readonly cpiStatus = computed(() => getIndexStatus(this.metrics().cpi));
  readonly spiStatus = computed(() => getIndexStatus(this.metrics().spi));
  readonly overallStatus = computed(() => {
    const statuses = [this.cpiStatus(), this.spiStatus()];
    if (statuses.includes('critical')) {
      return 'critical' as EvmStatus;
    }
    if (statuses.includes('warning')) {
      return 'warning' as EvmStatus;
    }
    return 'good' as EvmStatus;
  });

  readonly overallLabel = computed(() => getStatusLabel(this.overallStatus()));
}
