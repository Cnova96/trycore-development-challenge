import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetProjectEvmAnalysisUseCase } from './application/get-project-evm-analysis.use-case';
import { ProjectEvmAnalysisResponseDto } from './dto/project-evm-analysis-response.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectEvmAnalysisController {
  constructor(
    private readonly getProjectEvmAnalysis: GetProjectEvmAnalysisUseCase,
  ) {}

  @Get(':id/evm-analysis')
  @ApiOperation({
    summary: 'Obtener análisis EVM consolidado del proyecto',
    description:
      'Retorna los indicadores EVM por actividad y los consolidados del proyecto.',
  })
  @ApiOkResponse({
    type: ProjectEvmAnalysisResponseDto,
  })
  @ApiNotFoundResponse()
  async getEvmAnalysis(@Param('id') id: string) {
    return this.getProjectEvmAnalysis.execute(id);
  }
}
