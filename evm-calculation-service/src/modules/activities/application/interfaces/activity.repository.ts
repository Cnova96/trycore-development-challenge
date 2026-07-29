import { Activity } from '../../domain/entities/activity.entity';

export interface ActivityRepository {
  create(activity: Activity): Promise<Activity>;

  findById(id: string): Promise<Activity | null>;

  findByProject(projectId: string): Promise<Activity[]>;
}
