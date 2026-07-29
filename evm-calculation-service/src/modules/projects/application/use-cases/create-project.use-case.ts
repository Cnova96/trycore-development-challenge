import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project } from '../../domain/entities/project.entity';
import * as projectRepository from '../interfaces/project.repository';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject('ProjectRepository')
    private readonly repository: projectRepository.ProjectRepository,
  ) {}

  async execute(dto: CreateProjectDto) {
    const project = new Project('', dto.name, dto.description);

    return this.repository.create(project);
  }
}
