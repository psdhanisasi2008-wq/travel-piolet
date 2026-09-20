import { Request, Response, NextFunction } from 'express';
import { aiService } from './ai.service';
import { sendSuccess } from '../../utils/response';

export async function askAIHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tripId = req.params.tripId || 'trip-tokyo-123';
    const question = req.body.question || req.body.text || 'Can I fit TeamLab tomorrow?';
    const result = await aiService.answerTripQuestion(tripId, question);
    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}
