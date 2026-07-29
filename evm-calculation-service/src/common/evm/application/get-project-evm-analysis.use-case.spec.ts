import { NotFoundException } from '@nestjs/common';
import { Activity } from '../../../modules/activities/domain/entities/activity.entity';
import { GetProjectEvmAnalysisUseCase } from './get-project-evm-analysis.use-case';
import { EvmService } from '../evm.service';

describe('GetProjectEvmAnalysisUseCase', () => {
  const projectRepository = {
    findById: jest.fn(),
  };

  const activityRepository = {
    findByProject: jest.fn(),
  };

  const evmService = new EvmService();
  let useCase: GetProjectEvmAnalysisUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetProjectEvmAnalysisUseCase(
      projectRepository as never,
      activityRepository as never,
      evmService,
    );
  });

  it('retorna analisis EVM por actividad y consolidado', async () => {
    projectRepository.findById.mockResolvedValue({
      id: 'project-1',
      name: 'Proyecto demo',
    });
    activityRepository.findByProject.mockResolvedValue([
      new Activity(
        'activity-1',
        'Actividad demo',
        10000,
        50,
        40,
        4800,
        new Date('2026-07-01'),
        new Date('2026-07-31'),
        new Date('2026-07-01'),
        new Date('2026-07-01'),
        'project-1',
      ),
    ]);

    const result = await useCase.execute('project-1');

    expect(result.activities).toHaveLength(1);
    expect(result.activities[0].activity.id).toBe('activity-1');
    expect(result.activities[0].evm.pv).toBe(5000);
    expect(result.activities[0].evm.ev).toBe(4000);
    expect(result.consolidated.pv).toBe(5000);
    expect(result.consolidated.ev).toBe(4000);
  });

  it('retorna consolidado en cero cuando el proyecto no tiene actividades', async () => {
    projectRepository.findById.mockResolvedValue({
      id: 'project-1',
      name: 'Proyecto vacio',
    });
    activityRepository.findByProject.mockResolvedValue([]);

    const result = await useCase.execute('project-1');

    expect(result.activities).toEqual([]);
    expect(result.consolidated).toEqual({
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

  it('lanza NotFoundException cuando el proyecto no existe', async () => {
    projectRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('missing-project')).rejects.toThrow(
      NotFoundException,
    );
  });
});
