import { Activity } from '../../modules/activities/domain/entities/activity.entity';
import { EvmService } from './evm.service';

describe('EvmService', () => {
  let service: EvmService;

  beforeEach(() => {
    service = new EvmService();
  });

  describe('calculate', () => {
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
      expect(result.eac).toBeCloseTo(12000, 4);
      expect(result.vac).toBeCloseTo(-2000, 4);
    });

    it('retorna CPI y EAC en cero cuando AC es cero', () => {
      const result = service.calculate({
        bac: 10000,
        ac: 0,
        plannedPercent: 50,
        executedPercent: 40,
      });

      expect(result.ev).toBe(4000);
      expect(result.cpi).toBe(0);
      expect(result.eac).toBe(0);
      expect(result.vac).toBe(10000);
    });

    it('retorna EV en cero cuando el avance real es cero', () => {
      const result = service.calculate({
        bac: 10000,
        ac: 2000,
        plannedPercent: 50,
        executedPercent: 0,
      });

      expect(result.ev).toBe(0);
      expect(result.cv).toBe(-2000);
      expect(result.cpi).toBe(0);
      expect(result.eac).toBe(0);
    });

    it('retorna SPI en cero cuando PV es cero', () => {
      const result = service.calculate({
        bac: 10000,
        ac: 1000,
        plannedPercent: 0,
        executedPercent: 20,
      });

      expect(result.pv).toBe(0);
      expect(result.ev).toBe(2000);
      expect(result.spi).toBe(0);
    });
  });

  describe('calculatePlannedValue', () => {
    it('calcula PV con porcentaje planificado', () => {
      expect(service.calculatePlannedValue(50, 10000)).toBe(5000);
    });

    it('retorna cero cuando el porcentaje planificado es cero', () => {
      expect(service.calculatePlannedValue(0, 10000)).toBe(0);
    });
  });

  describe('calculateEarnedValue', () => {
    it('calcula EV con porcentaje ejecutado', () => {
      expect(service.calculateEarnedValue(40, 10000)).toBe(4000);
    });

    it('retorna cero cuando el avance real es cero', () => {
      expect(service.calculateEarnedValue(0, 10000)).toBe(0);
    });
  });

  describe('calculosDependientes', () => {
    it('calcula EAC y VAC cuando CPI es mayor a cero', () => {
      const result = service.calculosDependientes({
        bac: 10000,
        pv: 5000,
        ev: 4000,
        ac: 3200,
      });

      expect(result.cpi).toBe(1.25);
      expect(result.eac).toBe(8000);
      expect(result.vac).toBe(2000);
    });

    it('maneja AC en cero sin division por cero', () => {
      const result = service.calculosDependientes({
        bac: 10000,
        pv: 5000,
        ev: 4000,
        ac: 0,
      });

      expect(result.cpi).toBe(0);
      expect(result.eac).toBe(0);
    });
  });

  describe('calculateFromActivity', () => {
    it('calcula indicadores a partir de una actividad', () => {
      const activity = new Activity(
        'activity-1',
        'Actividad demo',
        10000,
        50,
        40,
        4800,
        new Date('2026-07-01'),
        new Date('2026-07-31'),
        new Date(),
        new Date(),
        'project-1',
      );

      const result = service.calculateFromActivity(activity);

      expect(result.pv).toBe(5000);
      expect(result.ev).toBe(4000);
      expect(result.ac).toBe(4800);
    });
  });

  describe('calculateConsolidated', () => {
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
        new Activity(
          'a1',
          'Actividad 1',
          10000,
          50,
          50,
          4000,
          new Date('2026-07-01'),
          new Date('2026-07-31'),
          new Date(),
          new Date(),
          'p1',
        ),
        new Activity(
          'a2',
          'Actividad 2',
          5000,
          80,
          60,
          3000,
          new Date('2026-07-01'),
          new Date('2026-07-31'),
          new Date(),
          new Date(),
          'p1',
        ),
      ];

      const result = service.calculateConsolidated(activities);

      expect(result.pv).toBe(9000);
      expect(result.ev).toBe(8000);
      expect(result.ac).toBe(7000);
      expect(result.cpi).toBeCloseTo(8000 / 7000, 4);
      expect(result.spi).toBeCloseTo(8000 / 9000, 4);
    });

    it('consolida correctamente cuando una actividad tiene AC en cero', () => {
      const activities = [
        new Activity(
          'a1',
          'Sin costo real',
          10000,
          50,
          50,
          0,
          new Date('2026-07-01'),
          new Date('2026-07-31'),
          new Date(),
          new Date(),
          'p1',
        ),
        new Activity(
          'a2',
          'Con costo real',
          5000,
          50,
          50,
          2500,
          new Date('2026-07-01'),
          new Date('2026-07-31'),
          new Date(),
          new Date(),
          'p1',
        ),
      ];

      const result = service.calculateConsolidated(activities);

      expect(result.ac).toBe(2500);
      expect(result.ev).toBe(7500);
      expect(result.cpi).toBe(3);
    });
  });
});
