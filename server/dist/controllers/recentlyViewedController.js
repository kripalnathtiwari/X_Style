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
exports.addRecentlyViewed = exports.getRecentlyViewed = void 0;
const prisma_1 = require("../utils/prisma");
const getRecentlyViewed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const history = yield prisma_1.prisma.recentlyViewed.findMany({
            where: { userId },
            orderBy: { viewedAt: 'desc' },
            take: 10, // Limit to 10 recently viewed
        });
        res.status(200).json({ status: 'success', data: history });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
exports.getRecentlyViewed = getRecentlyViewed;
const addRecentlyViewed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ status: 'error', message: 'Product ID is required' });
        }
        // Upsert to update viewedAt if already exists
        const viewed = yield prisma_1.prisma.recentlyViewed.upsert({
            where: { userId_productId: { userId, productId } },
            update: { viewedAt: new Date() },
            create: { userId, productId },
        });
        res.status(200).json({ status: 'success', data: viewed });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
exports.addRecentlyViewed = addRecentlyViewed;
