import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponseDto {
  @ApiProperty({
    example: '5fb84dc2-a458-48be-aad0-d735d3f7baf5',
  })
  id: string;

  @ApiProperty({
    example: 'Proyecto ERP',
  })
  name: string;

  @ApiProperty({
    example: 'Proyecto para implementar SAP.',
  })
  description?: string;

  @ApiProperty({
    example: '2026-07-29T14:30:00Z',
  })
  createdAt: Date;
  @ApiProperty({
    example: '2026-07-29T14:30:00Z',
  })
  updatedAt: Date;
}
