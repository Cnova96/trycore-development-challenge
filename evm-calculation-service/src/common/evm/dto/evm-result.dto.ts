import { ApiProperty } from '@nestjs/swagger';

export class EvmResultDto {
  @ApiProperty({ example: 7500 })
  pv: number;

  @ApiProperty({ example: 6750 })
  ev: number;

  @ApiProperty({ example: 7000 })
  ac: number;

  @ApiProperty({ example: -250 })
  cv: number;

  @ApiProperty({ example: -750 })
  sv: number;

  @ApiProperty({ example: 0.96 })
  cpi: number;

  @ApiProperty({ example: 0.9 })
  spi: number;

  @ApiProperty({ example: 15625 })
  eac: number;

  @ApiProperty({ example: -625 })
  vac: number;
}
