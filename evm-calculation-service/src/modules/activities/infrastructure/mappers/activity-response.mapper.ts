import { ActivityResponseDto } from '../../application/dto/activity-response.dto';
import { Activity } from '../../domain/entities/activity.entity';

export class ActivityResponseMapper {
  static toDto(activity: Activity): ActivityResponseDto {
    return {
      id: activity.id,
      name: activity.name,
      bac: activity.bac,
      plannedPercent: activity.plannedPercent,
      executedPercent: activity.executedPercent,
      actualCost: activity.actualCost,
      startDate: activity.startDate,
      endDate: activity.endDate,
      projectId: activity.projectId,
      createdAt: activity.createdAt!,
      updatedAt: activity.updatedAt!,
    };
  }

  static toDtoList(activities: Activity[]): ActivityResponseDto[] {
    return activities.map((activity) => this.toDto(activity));
  }
}
