import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../types/User';

const SECRET = process.env.JWT_SECRET_TOKEN || 'development';

export interface Request {
  get(data: string): string;
}

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

/**
 * this function
 * check if token is valid
 * @param req
 */
export function tokenIsValid(header: string): string | object {
  const token: string =  header.replace('Bearer ', '');
  return jwt.verify(token, SECRET);
}

/**
 * get key autorization
 * @param request
 */
export function getTokenFromHeaders(request: any): string {
  return request.req.headers.authorization;
}
