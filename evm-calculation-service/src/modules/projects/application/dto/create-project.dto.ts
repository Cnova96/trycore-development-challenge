import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Sistema EVM',
    description: 'Nombre del proyecto',
  })
  @IsString()
  @MaxLength(150)
  name: string;

  @ApiProperty({
    example: 'Proyecto para implementar Earned Value Management.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
