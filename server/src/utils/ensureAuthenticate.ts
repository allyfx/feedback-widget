import { verify } from 'jsonwebtoken';
import authConfig from '../configs/auth';

import { Request, Response, NextFunction } from 'express';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function ensureAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'JWT Token is missing',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    return res.status(401).json({
      error: 'JWT token is invalid',
    })
  }
}
