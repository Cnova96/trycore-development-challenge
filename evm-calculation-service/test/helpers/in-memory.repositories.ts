import { Injectable } from '@nestjs/common';
import { Activity } from '../../src/modules/activities/domain/entities/activity.entity';
import { ActivityRepository } from '../../src/modules/activities/application/interfaces/activity.repository';
import { Project } from '../../src/modules/projects/domain/entities/project.entity';
import { ProjectRepository } from '../../src/modules/projects/application/interfaces/project.repository';

@Injectable()
export class InMemoryProjectRepository implements ProjectRepository {
  private readonly projects = new Map<string, Project>();

  reset(): void {
    this.projects.clear();
  }

  async create(project: Project): Promise<Project> {
    this.projects.set(project.id, project);
    return project;
  }

  async findAll(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async findById(id: string): Promise<Project | null> {
    return this.projects.get(id) ?? null;
  }

  async update(project: Project): Promise<Project> {
    this.projects.set(project.id, project);
    return project;
  }

  async delete(id: string): Promise<void> {
    this.projects.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.projects.has(id);
  }
}

@Injectable()
export class InMemoryActivityRepository implements ActivityRepository {
  private readonly activities = new Map<string, Activity>();

  reset(): void {
    this.activities.clear();
  }

  async create(activity: Activity): Promise<Activity> {
    this.activities.set(activity.id, activity);
    return activity;
  }

  async findAll(): Promise<Activity[]> {
    return Array.from(this.activities.values());
  }

  async findById(id: string): Promise<Activity | null> {
    return this.activities.get(id) ?? null;
  }

  async findByProject(projectId: string): Promise<Activity[]> {
    return Array.from(this.activities.values()).filter(
      (activity) => activity.projectId === projectId,
    );
  }

  async update(activity: Activity): Promise<Activity> {
    this.activities.set(activity.id, activity);
    return activity;
  }

  async delete(id: string): Promise<void> {
    this.activities.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.activities.has(id);
  }
}
