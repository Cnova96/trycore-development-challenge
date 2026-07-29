import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { Activity } from '../../domain/entities/activity.entity';
import * as activityRepository_1 from '../interfaces/activity.repository';
import { ACTIVITY_REPOSITORY } from '../../infrastructure/repositories/activity.tokens';
import * as projectRepository_1 from 'src/modules/projects/application/interfaces/project.repository';

@Injectable()
export class CreateActivityUseCase {
  constructor(
    @Inject(ACTIVITY_REPOSITORY)
    private readonly activityRepository: activityRepository_1.ActivityRepository,

    @Inject('ProjectRepository')
    private readonly projectRepository: projectRepository_1.ProjectRepository,
  ) {}

  async execute(dto: CreateActivityDto): Promise<Activity> {
    const project = await this.projectRepository.findById(dto.projectId);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (dto.startDate > dto.endDate) {
      throw new BadRequestException(
        'Start date cannot be greater than end date',
      );
    }

    if (dto.plannedPercent < 0 || dto.plannedPercent > 100) {
      throw new BadRequestException('plannedPercent must be between 0 and 100');
    }

    if (dto.executedPercent < 0 || dto.executedPercent > 100) {
      throw new BadRequestException(
        'executedPercent must be between 0 and 100',
      );
    }

    if (dto.bac < 0) {
      throw new BadRequestException('BAC cannot be negative');
    }

    if (dto.actualCost < 0) {
      throw new BadRequestException('Actual Cost cannot be negative');
    }

    const activity = new Activity(
      randomUUID(),
      dto.name,
      dto.bac,
      dto.plannedPercent,
      dto.executedPercent,
      dto.actualCost,
      dto.startDate,
      dto.endDate,
      new Date(),
      new Date(),
      dto.projectId,
    );

    return this.activityRepository.create(activity);
  }
}
