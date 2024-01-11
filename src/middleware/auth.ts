import { NextFunction, Request, Response, response } from 'express';
import { getFirebaseApp } from '../authentications';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const verify = await getFirebaseApp().auth().verifyIdToken(token);

      next();
    } else {
      throw new Error('Unauthorized');
    }
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
    });
  }
};
export const isValidApiKey = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== process.env.APP_API_KEY) {
    res
      .status(401)
      .json({ message: 'Invalid API key. Please provide a valid API key.' });
  }
  next();
};
