import { Request, Response, NextFunction } from 'express';
import { activitiesService } from './activities.service';
import { sendSuccess } from '../../utils/response';

export async function getActivitiesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const category = req.query.category as string;
    const activities = await activitiesService.getActivities(category);
    return sendSuccess(res, activities);
  } catch (error) {
    next(error);
  }
}

export async function getActivityByIdHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const activity = await activitiesService.getActivityById(req.params.id);
    return sendSuccess(res, activity);
  } catch (error) {
    next(error);
  }
}
