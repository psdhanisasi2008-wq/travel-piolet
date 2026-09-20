import { Router } from 'express';
import {
  getBookingsHandler,
  createBookingHandler,
  updateBookingHandler,
  deleteBookingHandler
} from './bookings.controller';

const router = Router({ mergeParams: true });

router.get('/trips/:tripId/bookings', getBookingsHandler);
router.post('/trips/:tripId/bookings', createBookingHandler);
router.patch('/bookings/:id', updateBookingHandler);
router.delete('/bookings/:id', deleteBookingHandler);

export default router;
