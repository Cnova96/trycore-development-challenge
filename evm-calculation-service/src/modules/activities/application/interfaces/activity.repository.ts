import { Activity } from '../../domain/entities/activity.entity';

export interface ActivityRepository {
  create(activity: Activity): Promise<Activity>;

  findAll(): Promise<Activity[]>;

  findById(id: string): Promise<Activity | null>;

  findByProject(projectId: string): Promise<Activity[]>;

  update(activity: Activity): Promise<Activity>;

  delete(id: string): Promise<void>;

  exists(id: string): Promise<boolean>;
}
