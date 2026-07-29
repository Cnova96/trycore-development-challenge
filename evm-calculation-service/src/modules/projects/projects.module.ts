import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { CreateProjectUseCase } from './application/use-cases/create-project.use-case';
import { PrismaProjectRepository } from './infrastructure/repositories/prisma-project.repository';

@Module({
  controllers: [ProjectController],
  providers: [
    CreateProjectUseCase,
    {
      provide: 'ProjectRepository',
      useClass: PrismaProjectRepository,
    },
  ],
})
export class ProjectModule {}
