import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('❌ Express Global Error Handler:', err);

  const statusCode = err.statusCode || err.status || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected server error occurred';

  return sendError(res, code, message, statusCode, err.details || null);
}
