import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { secret_token } from '@config/auth';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    throw new AppError('Token missing!', 401);
  }

  const [, token] = authorizationHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, secret_token) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    request.user = {
      id: user_id,
      is_admin: user.is_admin,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
};

export default ensureAuthenticated;
