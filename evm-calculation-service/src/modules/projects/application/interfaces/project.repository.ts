import { Project } from '../../domain/entities/project.entity';

export interface ProjectRepository {
  create(project: Project): Promise<Project>;

  findAll(): Promise<Project[]>;

  findById(id: string): Promise<Project | null>;

  update(project: Project): Promise<Project>;

  delete(id: string): Promise<void>;

  exists(id: string): Promise<boolean>;
}
