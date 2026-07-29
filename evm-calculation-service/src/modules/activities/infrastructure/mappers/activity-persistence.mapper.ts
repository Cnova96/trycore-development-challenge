import { Activity } from '../../domain/entities/activity.entity';
import { Activity as PrismaActivity } from '@prisma/client';

export class ActivityPersistenceMapper {
  static toDomain(activity: PrismaActivity): Activity {
    return new Activity(
      activity.id,
      activity.name,
      Number(activity.bac),
      Number(activity.plannedPercent),
      Number(activity.executedPercent),
      Number(activity.actualCost),
      activity.startDate,
      activity.endDate,
      new Date(),
      new Date(),
      activity.projectId,
    );
  }

  static toPersistence(activity: Activity) {
    return {
      id: activity.id,
      name: activity.name,
      bac: activity.bac,
      plannedPercent: activity.plannedPercent,
      executedPercent: activity.executedPercent,
      actualCost: activity.actualCost,
      startDate: new Date(activity.startDate),
      endDate: new Date(activity.endDate),
      projectId: activity.projectId,
    };
  }
}
