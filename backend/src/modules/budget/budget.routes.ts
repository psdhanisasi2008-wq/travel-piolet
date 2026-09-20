import { Router } from 'express';
import {
  getBudgetHandler,
  updateBudgetHandler,
  getExpensesHandler,
  addExpenseHandler
} from './budget.controller';

const router = Router({ mergeParams: true });

router.get('/trips/:tripId/budget', getBudgetHandler);
router.patch('/trips/:tripId/budget', updateBudgetHandler);
router.get('/trips/:tripId/expenses', getExpensesHandler);
router.post('/trips/:tripId/expenses', addExpenseHandler);

export default router;
