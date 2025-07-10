import * as bcrypt from 'bcrypt';

const DEFAULT_SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  if (!password || password.length === 0) {
    throw new Error('Password cannot be empty');
  }

  return await bcrypt.hash(password, DEFAULT_SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  if (!password || !hashedPassword) {
    throw new Error('Password and hashed password cannot be empty');
  }

  return await bcrypt.compare(password, hashedPassword);
};
