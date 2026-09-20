import { Request, Response, NextFunction } from 'express';
import { budgetService } from './budget.service';
import { sendSuccess } from '../../utils/response';

export async function getBudgetHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tripId = req.params.tripId || 'trip-tokyo-123';
    const budget = await budgetService.getBudget(tripId);
    return sendSuccess(res, budget);
  } catch (error) {
    next(error);
  }
}

export async function updateBudgetHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tripId = req.params.tripId || 'trip-tokyo-123';
    const newLimit = req.body.budget || req.body.totalLimit || 45000;
    const result = await budgetService.updateBudgetLimit(tripId, newLimit);
    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}

export async function getExpensesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tripId = req.params.tripId || 'trip-tokyo-123';
    const expenses = await budgetService.getExpenses(tripId);
    return sendSuccess(res, expenses);
  } catch (error) {
    next(error);
  }
}

export async function addExpenseHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tripId = req.params.tripId || 'trip-tokyo-123';
    const expense = await budgetService.addExpense(tripId, req.body);
    return sendSuccess(res, expense, 201);
  } catch (error) {
    next(error);
  }
}
