import { Router } from 'express';
import { demoController } from './demo.controller';

const router = Router();

router.post('/flight-delay', demoController.flightDelay);
router.post('/activity-cancel', demoController.activityCancel);
router.post('/budget-change', demoController.budgetChange);
router.post('/reset', demoController.reset);
router.post('/seed', demoController.seed);

export default router;
