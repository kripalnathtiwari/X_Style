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
exports.removeFromCart = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const prisma_1 = require("../utils/prisma");
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        let cart = yield prisma_1.prisma.cart.findUnique({
            where: { userId },
            include: { items: true },
        });
        if (!cart) {
            cart = yield prisma_1.prisma.cart.create({
                data: { userId },
                include: { items: true },
            });
        }
        res.status(200).json({ status: 'success', data: cart });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
exports.getCart = getCart;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { productId, quantity = 1 } = req.body;
        if (!productId) {
            return res.status(400).json({ status: 'error', message: 'Product ID is required' });
        }
        let cart = yield prisma_1.prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            cart = yield prisma_1.prisma.cart.create({ data: { userId } });
        }
        const existingItem = yield prisma_1.prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });
        if (existingItem) {
            yield prisma_1.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        }
        else {
            yield prisma_1.prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                },
            });
        }
        const updatedCart = yield prisma_1.prisma.cart.findUnique({
            where: { id: cart.id },
            include: { items: true },
        });
        res.status(200).json({ status: 'success', data: updatedCart });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
exports.addToCart = addToCart;
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        if (!productId || quantity === undefined) {
            return res.status(400).json({ status: 'error', message: 'Product ID and quantity are required' });
        }
        const cart = yield prisma_1.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        if (quantity <= 0) {
            yield prisma_1.prisma.cartItem.deleteMany({
                where: { cartId: cart.id, productId },
            });
        }
        else {
            yield prisma_1.prisma.cartItem.update({
                where: { cartId_productId: { cartId: cart.id, productId } },
                data: { quantity },
            });
        }
        const updatedCart = yield prisma_1.prisma.cart.findUnique({
            where: { id: cart.id },
            include: { items: true },
        });
        res.status(200).json({ status: 'success', data: updatedCart });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
exports.updateCartItem = updateCartItem;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { productId } = req.body; // could also be params
        if (!productId) {
            return res.status(400).json({ status: 'error', message: 'Product ID is required' });
        }
        const cart = yield prisma_1.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        yield prisma_1.prisma.cartItem.deleteMany({
            where: { cartId: cart.id, productId },
        });
        const updatedCart = yield prisma_1.prisma.cart.findUnique({
            where: { id: cart.id },
            include: { items: true },
        });
        res.status(200).json({ status: 'success', data: updatedCart });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
exports.removeFromCart = removeFromCart;
