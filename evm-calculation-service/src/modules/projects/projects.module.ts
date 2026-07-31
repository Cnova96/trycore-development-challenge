import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { PrismaProjectRepository } from './infrastructure/repositories/prisma-project.repository';
import { CreateProjectUseCase } from './application/use-cases/create-project.use-case';
import { UpdateProjectUseCase } from './application/use-cases/update-project.use-case';
import { DeleteProjectUseCase } from './application/use-cases/delete-project.use-case';
import { GetProjectUseCase } from './application/use-cases/get-project.use-case';
import { GetProjectsUseCase } from './application/use-cases/get-projects.use-case';

@Module({
  controllers: [ProjectController],

  providers: [
    CreateProjectUseCase,
    UpdateProjectUseCase,
    DeleteProjectUseCase,
    GetProjectUseCase,
    GetProjectsUseCase,
    {
      provide: 'ProjectRepository',
      useClass: PrismaProjectRepository,
    },
  ],
  exports: ['ProjectRepository'],
})
export class ProjectModule {}
