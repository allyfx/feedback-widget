import { UserRepository } from '../repositories/users-repository';

import { hashPassword } from '../lib/hash';

import AppError from '../utils/AppError';

interface CreateUserUseCaseRequest {
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(
    private usersRepository: UserRepository
  ) {}

  async execute(request: CreateUserUseCaseRequest) {
    const { email, password } = request;

    const userAlreadyExists = await this.usersRepository.find(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    await this.usersRepository.create({
      email,
      password: hashedPassword
    });
  }
}
