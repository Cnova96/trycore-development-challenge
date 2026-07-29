import { Inject, Injectable } from '@nestjs/common';
import { ACTIVITY_REPOSITORY } from '../../infrastructure/repositories/activity.tokens';
import * as activityRepository from '../interfaces/activity.repository';

@Injectable()
export class GetActivitiesUseCase {
  constructor(
    @Inject(ACTIVITY_REPOSITORY)
    private readonly repository: activityRepository.ActivityRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
