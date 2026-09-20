import { Request, Response, NextFunction } from 'express';
import { demoService } from './demo.service';
import { sendSuccess } from '../../utils/response';

export class DemoController {
  public flightDelay = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tripId, delayMinutes } = req.body;
      const data = await demoService.simulateFlightDelay(tripId, delayMinutes ? Number(delayMinutes) : 120);
      return sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  };

  public activityCancel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tripId, activityName } = req.body;
      const data = await demoService.simulateActivityCancel(tripId, activityName);
      return sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  };

  public budgetChange = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tripId, newBudget } = req.body;
      const data = await demoService.simulateBudgetChange(tripId, newBudget ? Number(newBudget) : 45000);
      return sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  };

  public reset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await demoService.resetDemo();
      return sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  };

  public seed = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await demoService.seedDemo();
      return sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  };
}

export const demoController = new DemoController();
