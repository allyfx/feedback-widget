import { User } from "@prisma/client";

export interface UserCreateData {
  email: string;
  password: string;
}

export interface UserRepository {
  create: (data: UserCreateData) => Promise<void>;
  find: (email: string) => Promise<User | null>;
}
