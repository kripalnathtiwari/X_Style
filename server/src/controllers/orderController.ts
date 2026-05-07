import { Response } from 'express';
import { prisma } from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { addressId, total, paymentMethod, items } = req.body;

    if (!addressId || !total || !paymentMethod || !items) {
      return res.status(400).json({ status: 'error', message: 'Missing required order fields' });
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId,
        addressId,
        total,
        paymentMethod,
        items, // Stored as Json
        status: 'PENDING',
        paymentStatus: 'COMPLETED', // Mocking completion for now
      },
    });

    // Clear the cart
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (cart) {
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    }

    res.status(201).json({ status: 'success', data: order });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { address: true }
    });

    res.status(200).json({ status: 'success', data: orders });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getUserStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    
    const orders = await prisma.order.findMany({
      where: { userId }
    });

    const wishlistCount = await prisma.wishlist.count({
      where: { userId }
    });

    const totalSpent = orders.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = orders.length;

    res.status(200).json({ 
      status: 'success', 
      data: {
        totalOrders,
        totalSpent,
        wishlistCount
      } 
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
