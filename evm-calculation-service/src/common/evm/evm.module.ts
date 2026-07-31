import { Module } from '@nestjs/common';
import { ActivityModule } from '../../modules/activities/activities.module';
import { ProjectModule } from '../../modules/projects/projects.module';
import { GetProjectEvmAnalysisUseCase } from './application/get-project-evm-analysis.use-case';
import { EvmController } from './evm.controller';
import { ProjectEvmAnalysisController } from './project-evm-analysis.controller';
import { EvmService } from './evm.service';

@Module({
  imports: [ProjectModule, ActivityModule],
  controllers: [EvmController, ProjectEvmAnalysisController],
  providers: [EvmService, GetProjectEvmAnalysisUseCase],
  exports: [EvmService, GetProjectEvmAnalysisUseCase],
})
export class EvmModule {}
