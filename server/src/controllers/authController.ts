import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '../utils/prisma';
import { generateToken } from '../utils/jwt';
import { env } from '../config/env';
import { AuthRequest } from '../middlewares/auth';

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email and password are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ status: 'error', message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = generateToken({ id: user.id, role: user.role });

    res.status(201).json({
      status: 'success',
      data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token }
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, role: user.role });

    res.status(200).json({
      status: 'success',
      data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token }
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ status: 'error', message: 'Token is required' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ status: 'error', message: 'Invalid Google token' });
    }

    const { email, name } = payload;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: { email, name, password: null },
      });
    }

    const jwtToken = generateToken({ id: user.id, role: user.role });

    res.status(200).json({
      status: 'success',
      data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token: jwtToken }
    });
  } catch (error: any) {
    console.error("Google Login Error:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: { user: req.user }
  });
};
