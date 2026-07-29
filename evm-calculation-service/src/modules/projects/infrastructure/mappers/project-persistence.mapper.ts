import { Project as PrismaProject } from '@prisma/client';

import { Project } from '../../domain/entities/project.entity';

export class ProjectPersistenceMapper {
  static toDomain(project: PrismaProject): Project {
    return new Project(
      project.id,
      project.name,
      project.createdAt,
      project.updatedAt,
      project.description || '',
    );
  }

  static toPersistence(project: Project) {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
    };
  }
}
