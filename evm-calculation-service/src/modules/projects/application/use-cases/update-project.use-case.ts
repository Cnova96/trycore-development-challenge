import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as projectRepository from '../interfaces/project.repository';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class UpdateProjectUseCase {
  constructor(
    @Inject('ProjectRepository')
    private readonly repository: projectRepository.ProjectRepository,
  ) {}

  async execute(id: string, dto: UpdateProjectDto) {
    const project = await this.repository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project ${id} not found`);
    }

    if (dto.name !== undefined) {
      project.name = dto.name;
    }

    if (dto.description !== undefined) {
      project.description = dto.description;
    }

    return this.repository.update(project);
  }
}
