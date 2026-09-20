import { Request, Response, NextFunction } from 'express';
import { notificationsService } from './notifications.service';
import { sendSuccess } from '../../utils/response';

export class NotificationsController {
  public getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await notificationsService.getNotifications();
      return sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  };

  public markAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = await notificationsService.markAsRead(id);
      return sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  };
}

export const notificationsController = new NotificationsController();
