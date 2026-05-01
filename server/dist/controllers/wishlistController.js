"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromWishlist = exports.addToWishlist = exports.getWishlist = void 0;
const prisma_1 = require("../utils/prisma");
const getWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const wishlist = yield prisma_1.prisma.wishlist.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json({ status: 'success', data: wishlist });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
exports.getWishlist = getWishlist;
const addToWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ status: 'error', message: 'Product ID is required' });
        }
        const existing = yield prisma_1.prisma.wishlist.findUnique({
            where: { userId_productId: { userId, productId } },
        });
        if (existing) {
            return res.status(200).json({ status: 'success', data: existing, message: 'Already in wishlist' });
        }
        const newItem = yield prisma_1.prisma.wishlist.create({
            data: { userId, productId },
        });
        res.status(201).json({ status: 'success', data: newItem });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
exports.addToWishlist = addToWishlist;
const removeFromWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ status: 'error', message: 'Product ID is required' });
        }
        yield prisma_1.prisma.wishlist.deleteMany({
            where: { userId, productId },
        });
        res.status(200).json({ status: 'success', message: 'Removed from wishlist' });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
exports.removeFromWishlist = removeFromWishlist;
