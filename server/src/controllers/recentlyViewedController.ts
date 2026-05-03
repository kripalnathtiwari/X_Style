import { Response } from 'express';
import { prisma } from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth';

export const getRecentlyViewed = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const history = await prisma.recentlyViewed.findMany({
      where: { userId },
      orderBy: { viewedAt: 'desc' },
      take: 6, // Limit to 6 recently viewed
    });

    res.status(200).json({ status: 'success', data: history });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const addRecentlyViewed = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ status: 'error', message: 'Product ID is required' });
    }

    // Upsert to update viewedAt if already exists
    const viewed = await prisma.recentlyViewed.upsert({
      where: { userId_productId: { userId, productId } },
      update: { viewedAt: new Date() },
      create: { userId, productId },
    });

    res.status(200).json({ status: 'success', data: viewed });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
