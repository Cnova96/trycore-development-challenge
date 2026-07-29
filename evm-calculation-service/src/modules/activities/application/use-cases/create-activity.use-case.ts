import { Inject, Injectable } from '@nestjs/common';
import { CreateActivityDto } from '../create-activity.dto';
import { Activity } from '../../domain/entities/activity.entity';
import { PrismaActivityRepository } from '../../infrastructure/repositories/prisma-activity.repository';

@Injectable()
export class CreateActivityUseCase {
  constructor(
    @Inject('ActivityRepository')
    private readonly repository: PrismaActivityRepository,
  ) {}

  execute(dto: CreateActivityDto) {
    const activity = new Activity(
      '',
      dto.name,
      dto.bac,
      dto.plannedPercent,
      dto.executedPercent,
      dto.actualCost,
      dto.startDate,
      dto.endDate,
      dto.projectId,
    );

    return this.repository.create(activity);
  }
}
