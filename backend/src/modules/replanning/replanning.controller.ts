import { Request, Response, NextFunction } from 'express';
import { replanningService } from './replanning.service';
import { sendSuccess } from '../../utils/response';

export async function getProposalsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tripId = req.params.tripId || 'trip-tokyo-123';
    const proposals = await replanningService.getProposals(tripId);
    return sendSuccess(res, proposals);
  } catch (error) {
    next(error);
  }
}

export async function applyReplanHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const proposalId = req.params.id;
    const result = await replanningService.applyReplan(proposalId);
    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}

export async function getItineraryVersionsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tripId = req.params.tripId || 'trip-tokyo-123';
    const versions = await replanningService.getItineraryVersions(tripId);
    return sendSuccess(res, versions);
  } catch (error) {
    next(error);
  }
}
