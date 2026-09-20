import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendError } from '../utils/response';

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendError(
          res,
          'VALIDATION_ERROR',
          'Invalid request body payload',
          400,
          error.errors.map((e) => ({ field: e.path.join('.'), message: e.message }))
        );
      }
      next(error);
    }
  };
}
