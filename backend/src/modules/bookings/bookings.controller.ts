import { Request, Response, NextFunction } from 'express';
import { bookingsService } from './bookings.service';
import { sendSuccess } from '../../utils/response';

export async function getBookingsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tripId = req.params.tripId || 'trip-tokyo-123';
    const bookings = await bookingsService.getBookings(tripId);
    return sendSuccess(res, bookings);
  } catch (error) {
    next(error);
  }
}

export async function createBookingHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tripId = req.params.tripId || 'trip-tokyo-123';
    const booking = await bookingsService.createBooking(tripId, req.body);
    return sendSuccess(res, booking, 201);
  } catch (error) {
    next(error);
  }
}

export async function updateBookingHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const booking = await bookingsService.updateBooking(req.params.id, req.body);
    return sendSuccess(res, booking);
  } catch (error) {
    next(error);
  }
}

export async function deleteBookingHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await bookingsService.deleteBooking(req.params.id);
    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}
