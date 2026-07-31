import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateProjectDto } from './application/dto/create-project.dto';
import { UpdateProjectDto } from './application/dto/update-project.dto';
import { ProjectResponseDto } from './application/dto/project-response.dto';

import { ProjectResponseMapper } from './application/mappers/project-response.mapper';
import { CreateProjectUseCase } from './application/use-cases/create-project.use-case';
import { UpdateProjectUseCase } from './application/use-cases/update-project.use-case';
import { DeleteProjectUseCase } from './application/use-cases/delete-project.use-case';
import { GetProjectUseCase } from './application/use-cases/get-project.use-case';
import { GetProjectsUseCase } from './application/use-cases/get-projects.use-case';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(
    private readonly createProject: CreateProjectUseCase,
    private readonly updateProject: UpdateProjectUseCase,
    private readonly deleteProject: DeleteProjectUseCase,
    private readonly getProject: GetProjectUseCase,
    private readonly getProjects: GetProjectsUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear proyecto',
  })
  @ApiCreatedResponse({
    type: ProjectResponseDto,
  })
  @ApiBadRequestResponse()
  async create(
    @Body()
    dto: CreateProjectDto,
  ) {
    const project = await this.createProject.execute(dto);

    return ProjectResponseMapper.toDto(project);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar proyectos',
  })
  @ApiOkResponse({
    type: ProjectResponseDto,
    isArray: true,
  })
  async findAll() {
    const projects = await this.getProjects.execute();

    return ProjectResponseMapper.toDtoList(projects);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar proyecto',
  })
  @ApiOkResponse({
    type: ProjectResponseDto,
  })
  @ApiNotFoundResponse()
  async findOne(
    @Param('id')
    id: string,
  ) {
    const project = await this.getProject.execute(id);

    return ProjectResponseMapper.toDto(project);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar proyecto',
  })
  @ApiOkResponse({
    type: ProjectResponseDto,
  })
  async update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateProjectDto,
  ) {
    const project = await this.updateProject.execute(id, dto);

    return ProjectResponseMapper.toDto(project);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar proyecto',
  })
  @ApiNoContentResponse()
  async remove(
    @Param('id')
    id: string,
  ) {
    await this.deleteProject.execute(id);
  }
}
