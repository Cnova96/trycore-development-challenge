import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import * as projectRepository from '../interfaces/project.repository';

@Injectable()
export class DeleteProjectUseCase {
  constructor(
    @Inject('ProjectRepository')
    private readonly repository: projectRepository.ProjectRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const exists = await this.repository.exists(id);

    if (!exists) {
      throw new NotFoundException(`Project ${id} not found`);
    }

    await this.repository.delete(id);
  }
}
