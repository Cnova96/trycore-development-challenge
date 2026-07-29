import { ApiProperty } from '@nestjs/swagger';
import { ActivityResponseDto } from '../../../modules/activities/application/dto/activity-response.dto';
import { EvmResultDto } from './evm-result.dto';

export class ActivityEvmResponseDto {
  @ApiProperty({ type: ActivityResponseDto })
  activity: ActivityResponseDto;

  @ApiProperty({ type: EvmResultDto })
  evm: EvmResultDto;
}
