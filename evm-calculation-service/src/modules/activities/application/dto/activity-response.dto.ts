import { ApiProperty } from '@nestjs/swagger';

export class ActivityResponseDto {
  @ApiProperty({
    description: 'Identificador único de la actividad',
    example: '4b77b1a6-cf66-4b0d-badf-f8c6f93f86d4',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre de la actividad',
    example: 'Diseño de la base de datos',
  })
  name: string;

  @ApiProperty({
    description: 'Budget At Completion (BAC)',
    example: 150000,
    type: Number,
  })
  bac: number;

  @ApiProperty({
    description: 'Porcentaje planificado de avance',
    example: 35,
    minimum: 0,
    maximum: 100,
    type: Number,
  })
  plannedPercent: number;

  @ApiProperty({
    description: 'Porcentaje ejecutado',
    example: 30,
    minimum: 0,
    maximum: 100,
    type: Number,
  })
  executedPercent: number;

  @ApiProperty({
    description: 'Costo real acumulado',
    example: 48000,
    type: Number,
  })
  actualCost: number;

  @ApiProperty({
    description: 'Fecha de inicio',
    example: '2026-07-01T00:00:00.000Z',
    format: 'date-time',
  })
  startDate: Date;

  @ApiProperty({
    description: 'Fecha de finalización',
    example: '2026-07-31T00:00:00.000Z',
    format: 'date-time',
  })
  endDate: Date;

  @ApiProperty({
    description: 'Identificador del proyecto al que pertenece',
    example: '8dd53d36-0d90-4eb5-9f2e-7e40a1ddcfaf',
  })
  projectId: string;

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2026-07-29T14:20:00.000Z',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2026-07-29T14:35:00.000Z',
    format: 'date-time',
  })
  updatedAt: Date;
}
