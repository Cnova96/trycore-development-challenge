import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ActivityRepository } from '../../application/interfaces/activity.repository';
import { Activity } from '../../domain/entities/activity.entity';
import { ActivityMapper } from '../mappers/activity.mapper';

@Injectable()
export class PrismaActivityRepository implements ActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(activity: Activity): Promise<Activity> {
    const result = await this.prisma.activity.create({
      data: {
        name: activity.name,

        bac: activity.bac,

        plannedPercent: activity.plannedPercent,

        executedPercent: activity.executedPercent,

        actualCost: activity.actualCost,

        startDate: activity.startDate,

        endDate: activity.endDate,

        projectId: activity.projectId,
      },
    });

    return ActivityMapper.toDomain(result);
  }

  async findById(id: string) {
    const activity = await this.prisma.activity.findUnique({
      where: { id },
    });

    if (!activity) return null;

    return ActivityMapper.toDomain(activity);
  }

  async findByProject(projectId: string) {
    const result = await this.prisma.activity.findMany({
      where: {
        projectId,
      },
    });

    return result.map(ActivityMapper.toDomain);
  }
}
