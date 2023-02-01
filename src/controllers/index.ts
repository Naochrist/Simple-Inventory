import { Request, Response, NextFunction } from 'express';

export async function sampleIndexFn(req: Request, res: Response, next: NextFunction) {
  return res.json({ msg: 'Welcome' });
}