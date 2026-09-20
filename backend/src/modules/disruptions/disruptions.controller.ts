import { Request, Response, NextFunction } from 'express';
import { disruptionService } from './disruptions.service';
import { sendSuccess } from '../../utils/response';

export async function createDisruptionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tripId = req.params.tripId || 'trip-tokyo-123';
    const delayMinutes = req.body.delayMinutes || 120;
    const result = await disruptionService.handleFlightDelay(tripId, delayMinutes);
    return sendSuccess(res, result, 201);
  } catch (error) {
    next(error);
  }
}

export async function getDisruptionsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tripId = req.params.tripId || 'trip-tokyo-123';
    const disruptions = await disruptionService.getDisruptions(tripId);
    return sendSuccess(res, disruptions);
  } catch (error) {
    next(error);
  }
}
