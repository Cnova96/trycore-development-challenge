import { EvmService } from './evm.service';

describe('EvmService', () => {
  let service: EvmService;

  beforeEach(() => {
    service = new EvmService();
  });

  it('calcula PV y EV usando porcentajes 0-100', () => {
    const result = service.calculate({
      bac: 10000,
      ac: 4800,
      plannedPercent: 50,
      executedPercent: 40,
    });

    expect(result.pv).toBe(5000);
    expect(result.ev).toBe(4000);
    expect(result.ac).toBe(4800);
    expect(result.cv).toBe(-800);
    expect(result.sv).toBe(-1000);
    expect(result.cpi).toBeCloseTo(0.8333, 4);
    expect(result.spi).toBeCloseTo(0.8, 4);
  });

  it('retorna indicadores en cero cuando no hay actividades', () => {
    const result = service.calculateConsolidated([]);

    expect(result).toEqual({
      pv: 0,
      ev: 0,
      ac: 0,
      cv: 0,
      sv: 0,
      cpi: 0,
      spi: 0,
      eac: 0,
      vac: 0,
    });
  });

  it('consolida indicadores de multiples actividades', () => {
    const activities = [
      {
        bac: 10000,
        actualCost: 4000,
        plannedPercent: 50,
        executedPercent: 50,
      },
      {
        bac: 5000,
        actualCost: 3000,
        plannedPercent: 80,
        executedPercent: 60,
      },
    ] as never[];

    const result = service.calculateConsolidated(activities);

    expect(result.pv).toBe(9000);
    expect(result.ev).toBe(8000);
    expect(result.ac).toBe(7000);
    expect(result.cpi).toBeCloseTo(8000 / 7000, 4);
    expect(result.spi).toBeCloseTo(8000 / 9000, 4);
  });
});
