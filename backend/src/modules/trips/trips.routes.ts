import { Router } from 'express';
import { z } from 'zod';
import {
  createTripHandler,
  getTripsHandler,
  getTripByIdHandler,
  updateTripHandler,
  deleteTripHandler,
  getDashboardHandler,
  searchTripHandler
} from './trips.controller';
import { authenticateJWT } from '../../middleware/auth';
import { validateBody } from '../../middleware/requestValidator';

const router = Router();

const createTripSchema = z.object({
  name: z.string().optional(),
  destination: z.string().min(1),
  country: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  travelers: z.number().optional(),
  budget: z.number().optional(),
  interests: z.array(z.string()).optional(),
  pace: z.string().optional()
});

router.use(authenticateJWT);

router.post('/', validateBody(createTripSchema), createTripHandler);
router.get('/', getTripsHandler);
router.get('/:id', getTripByIdHandler);
router.patch('/:id', updateTripHandler);
router.delete('/:id', deleteTripHandler);
router.get('/:id/dashboard', getDashboardHandler);
router.get('/:id/search', searchTripHandler);

export default router;
