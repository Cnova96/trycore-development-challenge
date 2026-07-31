import { Module } from '@nestjs/common';
import { ProjectModule } from './modules/projects/projects.module';
import { ActivityModule } from './modules/activities/activities.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { EvmModule } from './common/evm/evm.module';

@Module({
  imports: [ProjectModule, ActivityModule, PrismaModule, EvmModule],
})
export class AppModule {}
