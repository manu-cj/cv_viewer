import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: '1h',
  });
};