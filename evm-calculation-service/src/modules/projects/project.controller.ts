import { Body, Controller, Post } from '@nestjs/common';
import { CreateProjectDto } from './application/dto/create-project.dto';
import { CreateProjectUseCase } from './application/use-cases/create-project.use-case';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectResponseDto } from './application/dto/project-response.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly createProject: CreateProjectUseCase) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo proyecto',
  })
  @ApiCreatedResponse({
    description: 'Proyecto creado.',
    type: ProjectResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno.',
  })
  create(@Body() dto: CreateProjectDto) {
    return this.createProject.execute(dto);
  }
}
