import { Response } from 'express';
import { prisma } from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth';

export const getWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const wishlist = await prisma.wishlist.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ status: 'success', data: wishlist });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const addToWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ status: 'error', message: 'Product ID is required' });
    }

    const existing = await prisma.wishlist.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existing) {
      return res.status(200).json({ status: 'success', data: existing, message: 'Already in wishlist' });
    }

    const newItem = await prisma.wishlist.create({
      data: { userId, productId },
    });

    res.status(201).json({ status: 'success', data: newItem });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const removeFromWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ status: 'error', message: 'Product ID is required' });
    }

    await prisma.wishlist.deleteMany({
      where: { userId, productId },
    });

    res.status(200).json({ status: 'success', message: 'Removed from wishlist' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
