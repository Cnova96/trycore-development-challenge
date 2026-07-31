import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Activity } from '../models/evm.model';

@Injectable({ providedIn: 'root' })
export class ActivityApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/activities`;

  create(activity: Omit<Activity, 'id'>): Observable<Activity> {
    return this.http.post<Activity>(this.baseUrl, activity);
  }

  update(id: string, activity: Partial<Activity>): Observable<Activity> {
    return this.http.patch<Activity>(`${this.baseUrl}/${id}`, activity);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
