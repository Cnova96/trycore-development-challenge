import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ACTIVITY_REPOSITORY } from '../../../modules/activities/infrastructure/repositories/activity.tokens';
import * as activityRepository from '../../../modules/activities/application/interfaces/activity.repository';
import { ActivityResponseMapper } from '../../../modules/activities/infrastructure/mappers/activity-response.mapper';
import * as projectRepository from '../../../modules/projects/application/interfaces/project.repository';
import { EvmService } from '../evm.service';
import { ProjectEvmAnalysisResponseDto } from '../dto/project-evm-analysis-response.dto';

@Injectable()
export class GetProjectEvmAnalysisUseCase {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: projectRepository.ProjectRepository,
    @Inject(ACTIVITY_REPOSITORY)
    private readonly activityRepository: activityRepository.ActivityRepository,
    private readonly evmService: EvmService,
  ) {}

  async execute(projectId: string): Promise<ProjectEvmAnalysisResponseDto> {
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new NotFoundException(`Proyecto ${projectId} no encontrado`);
    }

    const activities = await this.activityRepository.findByProject(projectId);

    return {
      activities: activities.map((activity) => ({
        activity: ActivityResponseMapper.toDto(activity),
        evm: this.evmService.calculateFromActivity(activity),
      })),
      consolidated: this.evmService.calculateConsolidated(activities),
    };
  }
}
