import { Injectable } from '@nestjs/common';
import { Activity } from '../../modules/activities/domain/entities/activity.entity';
import { EvmBaseInputDto } from './dto/evm-base-input.dto';
import { EvmInputDto } from './dto/evm-input.dto';
import { EvmResultDto } from './dto/evm-result.dto';

@Injectable()
export class EvmService {
  calculate(data: EvmBaseInputDto): EvmResultDto {
    const { ac, bac, plannedPercent, executedPercent } = data;
    const pv = this.calculatePlannedValue(plannedPercent, bac);
    const ev = this.calculateEarnedValue(executedPercent, bac);

    return this.calculosDependientes({ bac, ac, pv, ev });
  }

  calculateFromActivity(activity: Activity): EvmResultDto {
    return this.calculate({
      bac: activity.bac,
      ac: activity.actualCost,
      plannedPercent: activity.plannedPercent,
      executedPercent: activity.executedPercent,
    });
  }

  calculateConsolidated(activities: Activity[]): EvmResultDto {
    if (activities.length === 0) {
      return this.emptyResult();
    }

    const totals = activities.reduce(
      (acc, activity) => {
        const metrics = this.calculateFromActivity(activity);
        return {
          bac: acc.bac + activity.bac,
          pv: acc.pv + metrics.pv,
          ev: acc.ev + metrics.ev,
          ac: acc.ac + metrics.ac,
        };
      },
      { bac: 0, pv: 0, ev: 0, ac: 0 },
    );

    return this.calculosDependientes(totals);
  }

  calculosDependientes(data: EvmInputDto): EvmResultDto {
    const { bac, pv, ev, ac } = data;

    const cv = ev - ac;
    const sv = ev - pv;

    const cpi = ac > 0 ? ev / ac : 0;
    const spi = pv > 0 ? ev / pv : 0;

    const eac = cpi > 0 ? bac / cpi : 0;
    const vac = bac - eac;

    return {
      pv,
      ev,
      ac,
      cv,
      sv,
      cpi,
      spi,
      eac,
      vac,
    };
  }

  calculatePlannedValue(plannedPercent: number, bac: number): number {
    return (plannedPercent / 100) * bac;
  }

  calculateEarnedValue(executedPercent: number, bac: number): number {
    return (executedPercent / 100) * bac;
  }

  private emptyResult(): EvmResultDto {
    return {
      pv: 0,
      ev: 0,
      ac: 0,
      cv: 0,
      sv: 0,
      cpi: 0,
      spi: 0,
      eac: 0,
      vac: 0,
    };
  }
}
