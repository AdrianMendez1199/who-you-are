import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../types/User';

const SECRET = process.env.JWT_SECRET_TOKEN || '';

/**
 * compare plain password and encripted password
 * using bcrypt
 * @param password
 * @param encripted
 * @return @promise<Boolean>
 */
export async function comparePassword(password: string, encripted: string):
 Promise<boolean> {
  return await bcrypt.compare(password, encripted);
}

/**
 * generate hash password using bcrypt
 * @param password
 * @return promise<string>
 */
export async function generatePassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

/**
 * generate authenticated token
 * using jwt
 * @param user
 * @return string
 */
export function generateToken(user: User): string {
  return jwt.sign({ user }, SECRET, { expiresIn: '24h' });
}
