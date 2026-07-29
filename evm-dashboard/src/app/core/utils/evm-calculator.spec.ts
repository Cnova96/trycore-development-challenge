import { calculateConsolidatedEvm, calculateEvm } from './evm-calculator';

describe('evm-calculator', () => {
  it('calcula indicadores EVM con porcentajes 0-100', () => {
    const result = calculateEvm({
      bac: 10000,
      ac: 4800,
      plannedPercent: 50,
      executedPercent: 40,
    });

    expect(result.pv).toBe(5000);
    expect(result.ev).toBe(4000);
    expect(result.cpi).toBeCloseTo(0.8333, 4);
    expect(result.spi).toBeCloseTo(0.8, 4);
  });

  it('consolida multiples actividades', () => {
    const result = calculateConsolidatedEvm([
      {
        name: 'A',
        bac: 10000,
        actualCost: 4000,
        plannedPercent: 50,
        executedPercent: 50,
        startDate: '2026-01-01',
        endDate: '2026-02-01',
        projectId: 'p1',
      },
      {
        name: 'B',
        bac: 5000,
        actualCost: 3000,
        plannedPercent: 80,
        executedPercent: 60,
        startDate: '2026-01-01',
        endDate: '2026-02-01',
        projectId: 'p1',
      },
    ]);

    expect(result.pv).toBe(9000);
    expect(result.ev).toBe(8000);
    expect(result.ac).toBe(7000);
  });
});
