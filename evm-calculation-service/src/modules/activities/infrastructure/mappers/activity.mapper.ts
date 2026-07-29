import { Activity } from '../../domain/entities/activity.entity';

export class ActivityMapper {
  static toDomain(activity: any): Activity {
    return new Activity(
      activity.id,

      activity.name,

      Number(activity.bac),

      Number(activity.plannedPercent),

      Number(activity.executedPercent),

      Number(activity.actualCost),

      activity.startDate,

      activity.endDate,

      activity.projectId,
    );
  }
}
