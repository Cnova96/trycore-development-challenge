import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as projectRepository from '../interfaces/project.repository';

@Injectable()
export class GetProjectUseCase {
  constructor(
    @Inject('ProjectRepository')
    private readonly repository: projectRepository.ProjectRepository,
  ) {}

  async execute(id: string) {
    const project = await this.repository.findById(id);

    if (!project) throw new NotFoundException('Project not found');

    return project;
  }
}
