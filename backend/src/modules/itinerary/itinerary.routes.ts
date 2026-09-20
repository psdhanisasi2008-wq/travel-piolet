import { Router } from 'express';
import {
  generateItineraryHandler,
  getItineraryHandler,
  updateItineraryItemHandler,
  getBackupsHandler
} from './itinerary.controller';

const router = Router({ mergeParams: true });

router.post('/trips/:tripId/generate-itinerary', generateItineraryHandler);
router.get('/trips/:tripId/itinerary', getItineraryHandler);
router.patch('/itinerary/items/:id', updateItineraryItemHandler);
router.get('/trips/:tripId/backups', getBackupsHandler);

export default router;
