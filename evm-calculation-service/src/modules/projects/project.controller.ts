import { Body, Controller, Post } from '@nestjs/common';
import { CreateProjectDto } from './application/dto/create-project.dto';
import { CreateProjectUseCase } from './application/use-cases/create-project.use-case';

@Controller('projects')
export class ProjectController {
  constructor(private readonly createProject: CreateProjectUseCase) {}

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.createProject.execute(dto);
  }
}
