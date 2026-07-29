import { Inject, Injectable } from '@nestjs/common';
import * as projectRepository from '../interfaces/project.repository';

@Injectable()
export class GetProjectsUseCase {
  constructor(
    @Inject('ProjectRepository')
    private readonly repository: projectRepository.ProjectRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
