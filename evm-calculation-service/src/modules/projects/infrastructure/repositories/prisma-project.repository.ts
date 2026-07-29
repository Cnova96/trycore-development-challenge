import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../config/prisma/prisma.service';
import { Project } from '../../domain/entities/project.entity';
import { ProjectRepository } from '../../application/interfaces/project.repository';
import { ProjectPersistenceMapper } from '../mappers/project-persistence.mapper';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(project: Project): Promise<Project> {
    const created = await this.prisma.project.create({
      data: ProjectPersistenceMapper.toPersistence(project),
    });

    return ProjectPersistenceMapper.toDomain(created);
  }

  async findAll(): Promise<Project[]> {
    const result = await this.prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return result.map(ProjectPersistenceMapper.toDomain);
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) return null;

    return ProjectPersistenceMapper.toDomain(project);
  }

  async update(project: Project): Promise<Project> {
    const updated = await this.prisma.project.update({
      where: {
        id: project.id,
      },

      data: {
        name: project.name,

        description: project.description,
      },
    });

    return ProjectPersistenceMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.project.count({
      where: {
        id,
      },
    });

    return count > 0;
  }
}
