import { Router } from 'express';
import { createDisruptionHandler, getDisruptionsHandler } from './disruptions.controller';

const router = Router({ mergeParams: true });

router.get('/trips/:tripId/disruptions', getDisruptionsHandler);
router.post('/trips/:tripId/disruptions', createDisruptionHandler);

export default router;
