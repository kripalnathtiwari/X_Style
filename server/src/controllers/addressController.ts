import { Response } from 'express';
import { prisma } from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth';

export const createAddress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, street, city, postalCode, phone, isDefault } = req.body;

    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.create({
      data: {
        userId,
        firstName,
        lastName,
        street,
        city,
        postalCode,
        phone,
        isDefault,
      },
    });

    res.status(201).json({ status: 'success', data: address });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getAddresses = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const addresses = await prisma.address.findMany({ where: { userId } });
    res.status(200).json({ status: 'success', data: addresses });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
