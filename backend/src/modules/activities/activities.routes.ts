import { Router } from 'express';
import { getActivitiesHandler, getActivityByIdHandler } from './activities.controller';

const router = Router();

router.get('/', getActivitiesHandler);
router.get('/:id', getActivityByIdHandler);

export default router;
