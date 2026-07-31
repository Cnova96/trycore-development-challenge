import { PrismaService } from 'src/config/prisma/prisma.service';
import { ActivityRepository } from '../../application/interfaces/activity.repository';
import { ActivityPersistenceMapper } from '../mappers/activity-persistence.mapper';
import { Activity } from '../../domain/entities/activity.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaActivityRepository implements ActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(activity: Activity) {
    const created = await this.prisma.activity.create({
      data: ActivityPersistenceMapper.toPersistence(activity),
    });

    return ActivityPersistenceMapper.toDomain(created);
  }

  async findAll() {
    const result = await this.prisma.activity.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return result.map(ActivityPersistenceMapper.toDomain);
  }

  async findById(id: string) {
    const activity = await this.prisma.activity.findUnique({
      where: {
        id,
      },
    });

    if (!activity) return null;

    return ActivityPersistenceMapper.toDomain(activity);
  }

  async findByProject(projectId: string) {
    const result = await this.prisma.activity.findMany({
      where: {
        projectId,
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    return result.map(ActivityPersistenceMapper.toDomain);
  }

  async update(activity: Activity) {
    const updated = await this.prisma.activity.update({
      where: {
        id: activity.id,
      },
      data: {
        name: activity.name,
        bac: activity.bac,
        plannedPercent: activity.plannedPercent,
        executedPercent: activity.executedPercent,
        actualCost: activity.actualCost,
        startDate: activity.startDate,
        endDate: activity.endDate,
      },
    });

    return ActivityPersistenceMapper.toDomain(updated);
  }

  async delete(id: string) {
    await this.prisma.activity.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: string) {
    const count = await this.prisma.activity.count({
      where: {
        id,
      },
    });

    return count > 0;
  }
}
