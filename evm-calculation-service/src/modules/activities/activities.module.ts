import { Module } from '@nestjs/common';

import { ActivityController } from './activity.controller';

import { PrismaActivityRepository } from './infrastructure/repositories/prisma-activity.repository';
import { ProjectModule } from '../projects/projects.module';
import { CreateActivityUseCase } from './application/use-cases/create-activity.use-case';
import { UpdateActivityUseCase } from './application/use-cases/update-activity.use-case';
import { DeleteActivityUseCase } from './application/use-cases/delete-activity.use-case';
import { GetActivityUseCase } from './application/use-cases/get-activity.use-case';
import { GetActivitiesUseCase } from './application/use-cases/get-activities.use-case';
import { GetProjectActivitiesUseCase } from './application/use-cases/get-project-activities.use-case';
import { ACTIVITY_REPOSITORY } from './infrastructure/repositories/activity.tokens';

@Module({
  imports: [ProjectModule],

  controllers: [ActivityController],

  providers: [
    CreateActivityUseCase,
    UpdateActivityUseCase,
    DeleteActivityUseCase,
    GetActivityUseCase,
    GetActivitiesUseCase,
    GetProjectActivitiesUseCase,
    {
      provide: ACTIVITY_REPOSITORY,
      useClass: PrismaActivityRepository,
    },
  ],
  exports: [
    {
      provide: ACTIVITY_REPOSITORY,
      useClass: PrismaActivityRepository,
    },
  ],
})
export class ActivityModule {}
