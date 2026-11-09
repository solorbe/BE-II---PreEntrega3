import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
const ALGORITHM = 'HS256';

export const generateToken = (payload) =>
  jwt.sign(payload, config.jwtSecret, {
    algorithm: ALGORITHM,
    expiresIn: config.jwtExpiresIn,
  });

export const verifyToken = (token) =>
  jwt.verify(token, config.jwtSecret, { algorithms: [ALGORITHM] });