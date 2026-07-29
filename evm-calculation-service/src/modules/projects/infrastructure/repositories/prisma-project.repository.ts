import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../config/prisma/prisma.service';
import { ProjectRepository } from '../../application/interfaces/project.repository';
import { Project } from '../../domain/entities/project.entity';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(project: Project): Promise<Project> {
    const result = await this.prisma.project.create({
      data: {
        name: project.name,
        description: project.description,
      },
    });

    return new Project(result.id, result.name, result.description ?? undefined);
  }

  async findById(id: string): Promise<Project | null> {
    const result = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!result) return null;

    return new Project(result.id, result.name, result.description ?? undefined);
  }
}
