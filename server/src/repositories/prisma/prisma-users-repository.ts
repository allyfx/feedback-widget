import { prisma } from "../../prisma";

import { UserCreateData, UserRepository } from '../users-repository';

export class PrismaUsersRepository implements UserRepository {
  async create({ email, password }: UserCreateData) {
    await prisma.user.create({
      data: {
        email,
        password,
      },
    });
  };

  async find(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      }
    });
  }
}