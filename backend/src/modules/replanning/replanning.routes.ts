import { Router } from 'express';
import {
  getProposalsHandler,
  applyReplanHandler,
  getItineraryVersionsHandler
} from './replanning.controller';

const router = Router({ mergeParams: true });

router.get('/trips/:tripId/replans', getProposalsHandler);
router.post('/replans/:id/apply', applyReplanHandler);
router.get('/trips/:tripId/itinerary/versions', getItineraryVersionsHandler);

export default router;
