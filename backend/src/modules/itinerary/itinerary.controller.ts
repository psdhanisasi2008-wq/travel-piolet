import { Request, Response, NextFunction } from 'express';
import { itineraryService } from './itinerary.service';
import { sendSuccess } from '../../utils/response';

export async function generateItineraryHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tripId = req.params.tripId || 'trip-tokyo-123';
    const result = await itineraryService.generateItinerary(tripId, req.body);
    return sendSuccess(res, result, 201);
  } catch (error) {
    next(error);
  }
}

export async function getItineraryHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tripId = req.params.tripId || 'trip-tokyo-123';
    const itinerary = await itineraryService.getItinerary(tripId);
    return sendSuccess(res, itinerary);
  } catch (error) {
    next(error);
  }
}

export async function updateItineraryItemHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const itemId = req.params.id;
    const result = await itineraryService.updateItem(itemId, req.body);
    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}

export async function getBackupsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tripId = req.params.tripId || 'trip-tokyo-123';
    const backups = await itineraryService.getBackups(tripId);
    return sendSuccess(res, backups);
  } catch (error) {
    next(error);
  }
}
