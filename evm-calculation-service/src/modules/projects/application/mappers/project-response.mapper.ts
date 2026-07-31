import { Project } from '../../domain/entities/project.entity';
import { ProjectResponseDto } from '../dto/project-response.dto';

export class ProjectResponseMapper {
  static toDto(project: Project): ProjectResponseDto {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      createdAt: project.createdAt!,
      updatedAt: project.updatedAt!,
    };
  }

  static toDtoList(projects: Project[]): ProjectResponseDto[] {
    return projects.map(ProjectResponseMapper.toDto);
  }
}
