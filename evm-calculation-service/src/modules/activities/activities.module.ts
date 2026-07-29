import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { CreateActivityUseCase } from './application/use-cases/create-activity.use-case';
import { PrismaActivityRepository } from './infrastructure/repositories/prisma-activity.repository';

@Module({
  controllers: [ActivityController],

  providers: [
    CreateActivityUseCase,

    {
      provide: 'ActivityRepository',

      useClass: PrismaActivityRepository,
    },
  ],
})
export class ActivityModule {}
