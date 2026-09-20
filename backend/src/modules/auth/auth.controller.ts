import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { sendSuccess } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/auth';

export async function registerHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name } = req.body;
    const result = await authService.register(email, password, name);
    return sendSuccess(res, result, 201);
  } catch (error) {
    next(error);
  }
}

export async function loginHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}

export async function getMeHandler(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id || 'demo-user-id';
    const user = await authService.getCurrentUser(userId);
    return sendSuccess(res, user);
  } catch (error) {
    next(error);
  }
}
