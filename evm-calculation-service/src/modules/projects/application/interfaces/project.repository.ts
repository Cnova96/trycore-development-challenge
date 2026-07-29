import { Project } from '../../domain/entities/project.entity';

export interface ProjectRepository {
  create(project: Project): Promise<Project>;

  findById(id: string): Promise<Project | null>;
}
