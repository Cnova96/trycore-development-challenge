import { ApiProperty } from '@nestjs/swagger';
import { ActivityEvmResponseDto } from './activity-evm-response.dto';
import { EvmResultDto } from './evm-result.dto';

export class ProjectEvmAnalysisResponseDto {
  @ApiProperty({ type: ActivityEvmResponseDto, isArray: true })
  activities: ActivityEvmResponseDto[];

  @ApiProperty({ type: EvmResultDto })
  consolidated: EvmResultDto;
}
