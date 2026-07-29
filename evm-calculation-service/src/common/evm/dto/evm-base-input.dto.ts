import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class EvmBaseInputDto {
  @ApiProperty({ example: 15000, minimum: 0 })
  @IsNumber()
  @Min(0)
  bac: number;

  @ApiProperty({ example: 7000, minimum: 0 })
  @IsNumber()
  @Min(0)
  ac: number;

  @ApiProperty({ example: 50, minimum: 0, maximum: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  plannedPercent: number;

  @ApiProperty({ example: 45, minimum: 0, maximum: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  executedPercent: number;
}
