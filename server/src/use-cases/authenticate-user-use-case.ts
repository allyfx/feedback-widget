
import { sign } from 'jsonwebtoken';
import authConfig from '../configs/auth';

import { UserRepository } from '../repositories/users-repository';

import { comparePassword } from '../lib/hash';

import AppError from '../utils/AppError';

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UserRepository
  ) {}

  async execute(request: AuthenticateUserUseCaseRequest) {
    const { email, password } = request;

    const userExists = await this.usersRepository.find(email);

    if (!userExists) {
      throw new AppError('E-mail or password does not match.');
    }

    const passwordMatch = await comparePassword(password, userExists.password);
    
    if (!passwordMatch) {
      throw new AppError('E-mail or password does not match.');
    }

    const { expiredIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userExists.id,
      expiresIn: expiredIn,
    });

    return {
      user: {
        email: userExists.email,
      },
      token,
    }
  }
}