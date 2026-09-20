import { Request, Response, NextFunction } from 'express';
import { tripsService } from './trips.service';
import { sendSuccess } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/auth';

export async function createTripHandler(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id || 'demo-user-id';
    const trip = await tripsService.createTrip(userId, req.body);
    return sendSuccess(res, trip, 201);
  } catch (error) {
    next(error);
  }
}

export async function getTripsHandler(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id || 'demo-user-id';
    const trips = await tripsService.getTrips(userId);
    return sendSuccess(res, trips);
  } catch (error) {
    next(error);
  }
}

export async function getTripByIdHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const trip = await tripsService.getTripById(req.params.id);
    return sendSuccess(res, trip);
  } catch (error) {
    next(error);
  }
}

export async function updateTripHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const trip = await tripsService.updateTrip(req.params.id, req.body);
    return sendSuccess(res, trip);
  } catch (error) {
    next(error);
  }
}

export async function deleteTripHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await tripsService.deleteTrip(req.params.id);
    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}

export async function getDashboardHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const dashboard = await tripsService.getDashboard(req.params.id);
    return sendSuccess(res, dashboard);
  } catch (error) {
    next(error);
  }
}

export async function searchTripHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const query = (req.query.q as string) || '';
    const results = await tripsService.searchTrip(req.params.id, query);
    return sendSuccess(res, results);
  } catch (error) {
    next(error);
  }
}
