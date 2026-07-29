import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Project, ProjectEvmAnalysis } from '../models/evm.model';

@Injectable({ providedIn: 'root' })
export class ProjectApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/projects`;

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  createProject(name: string, description?: string): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, { name, description });
  }

  getEvmAnalysis(projectId: string): Observable<ProjectEvmAnalysis> {
    return this.http.get<ProjectEvmAnalysis>(
      `${this.baseUrl}/${projectId}/evm-analysis`,
    );
  }
}
