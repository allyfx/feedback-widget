import { compare, hash } from 'bcryptjs';

export function hashPassword(password: string): Promise<string> {
  return hash(password, 8);
}

export function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}
