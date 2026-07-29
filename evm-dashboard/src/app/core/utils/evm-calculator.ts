import { Activity, EvmMetrics } from '../models/evm.model';

export interface EvmInput {
  bac: number;
  ac: number;
  plannedPercent: number;
  executedPercent: number;
}

export function calculateEvm(input: EvmInput): EvmMetrics {
  const pv = (input.plannedPercent / 100) * input.bac;
  const ev = (input.executedPercent / 100) * input.bac;
  const ac = input.ac;

  const cv = ev - ac;
  const sv = ev - pv;
  const cpi = ac > 0 ? ev / ac : 0;
  const spi = pv > 0 ? ev / pv : 0;
  const eac = cpi > 0 ? input.bac / cpi : 0;
  const vac = input.bac - eac;

  return { pv, ev, ac, cv, sv, cpi, spi, eac, vac };
}

export function calculateEvmFromActivity(activity: Activity): EvmMetrics {
  return calculateEvm({
    bac: activity.bac,
    ac: activity.actualCost,
    plannedPercent: activity.plannedPercent,
    executedPercent: activity.executedPercent,
  });
}

export function calculateConsolidatedEvm(activities: Activity[]): EvmMetrics {
  if (activities.length === 0) {
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

  const totals = activities.reduce(
    (acc, activity) => {
      const metrics = calculateEvmFromActivity(activity);
      return {
        bac: acc.bac + activity.bac,
        pv: acc.pv + metrics.pv,
        ev: acc.ev + metrics.ev,
        ac: acc.ac + metrics.ac,
      };
    },
    { bac: 0, pv: 0, ev: 0, ac: 0 },
  );

  const cv = totals.ev - totals.ac;
  const sv = totals.ev - totals.pv;
  const cpi = totals.ac > 0 ? totals.ev / totals.ac : 0;
  const spi = totals.pv > 0 ? totals.ev / totals.pv : 0;
  const eac = cpi > 0 ? totals.bac / cpi : 0;
  const vac = totals.bac - eac;

  return {
    pv: totals.pv,
    ev: totals.ev,
    ac: totals.ac,
    cv,
    sv,
    cpi,
    spi,
    eac,
    vac,
  };
}
