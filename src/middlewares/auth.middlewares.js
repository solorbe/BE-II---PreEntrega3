import { verifyToken } from '../utils/jwt.js';

const unauthorizedResponse = (res) =>
  res.status(401).json({ status: 'error', message: 'Unauthorized' });

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.currentUser;
  if (!token) return unauthorizedResponse(res);

  try {
    const { id, email, role } = verifyToken(token);
    req.user = { id, email, role };
    next();
  } catch (error) {
    return unauthorizedResponse(res);
  }
};
