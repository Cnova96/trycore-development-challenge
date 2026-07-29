import { Module } from '@nestjs/common';
import { ProjectModule } from './modules/projects/projects.module';
import { ActivityModule } from './modules/activities/activities.module';
import { PrismaModule } from './config/prisma/prisma.module';

@Module({
  imports: [ProjectModule, ActivityModule, PrismaModule],
})
export class AppModule {}
