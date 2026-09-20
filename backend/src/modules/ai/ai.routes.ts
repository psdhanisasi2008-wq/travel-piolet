import { Router } from 'express';
import { askAIHandler } from './ai.controller';

const router = Router({ mergeParams: true });

router.post('/trips/:tripId/ask', askAIHandler);

export default router;
