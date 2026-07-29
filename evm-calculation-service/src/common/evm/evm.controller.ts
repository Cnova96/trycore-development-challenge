import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EvmService } from './evm.service';
import { EvmBaseInputDto } from './dto/evm-base-input.dto';
import { EvmResultDto } from './dto/evm-result.dto';

@ApiTags('EVM')
@Controller('evm')
export class EvmController {
  constructor(private readonly evmService: EvmService) {}

  @Post('calculate')
  @ApiOperation({
    summary: 'Calcular indicadores EVM a partir de datos de actividad',
    description:
      'Permite obtener métricas EVM en tiempo real sin persistir cambios.',
  })
  @ApiOkResponse({ type: EvmResultDto })
  @ApiBadRequestResponse()
  calculate(@Body() dto: EvmBaseInputDto): EvmResultDto {
    return this.evmService.calculate({
      bac: dto.bac,
      ac: dto.ac,
      plannedPercent: dto.plannedPercent,
      executedPercent: dto.executedPercent,
    });
  }
}
