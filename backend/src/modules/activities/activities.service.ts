import { mockStore } from '../../utils/mockStore';

export class ActivitiesService {
  public async getActivities(category?: string) {
    if (!category || category === 'all') {
      return mockStore.activities;
    }
    return mockStore.activities.filter(
      (a) => a.category.toLowerCase() === category.toLowerCase()
    );
  }

  public async getActivityById(id: string) {
    const activity = mockStore.activities.find((a) => a.id === id);
    if (!activity) {
      throw { code: 'ACTIVITY_NOT_FOUND', message: 'Activity not found', statusCode: 404 };
    }
    return activity;
  }
}

export const activitiesService = new ActivitiesService();
