import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max, IsDateString } from 'class-validator';

export class CreateActivityDto {
  @ApiProperty({
    description: 'Nombre de la actividad',
    example: 'Desarrollo del módulo de autenticación',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'BAC (Budget At Completion) de la actividad',
    example: 15000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  bac: number;

  @ApiProperty({
    description: 'Porcentaje planificado de avance',
    example: 50,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  plannedPercent: number;

  @ApiProperty({
    description: 'Porcentaje ejecutado de avance',
    example: 45,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  executedPercent: number;

  @ApiProperty({
    description: 'Costo real (Actual Cost)',
    example: 7000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  actualCost: number;

  @ApiProperty({
    description: 'Fecha de inicio de la actividad',
    example: '2026-07-01',
    format: 'date',
  })
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    description: 'Fecha de finalización de la actividad',
    example: '2026-07-31',
    format: 'date',
  })
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    description:
      'Identificador único del proyecto al que pertenece la actividad',
    example: '4d4d4d4d-9d9d-4c4c-a111-123456789abc',
  })
  @IsString()
  projectId: string;
}
