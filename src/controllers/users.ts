import { Request, Response, NextFunction } from 'express';

export async function sampleUserFn(req: Request, res: Response, next: NextFunction) {
  return res.json({ msg: 'respond with a resource' });
}