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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.googleLogin = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const google_auth_library_1 = require("google-auth-library");
const prisma_1 = require("../utils/prisma");
const jwt_1 = require("../utils/jwt");
const env_1 = require("../config/env");
const googleClient = new google_auth_library_1.OAuth2Client(env_1.env.GOOGLE_CLIENT_ID);
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }
        const existingUser = yield prisma_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ status: 'error', message: 'User already exists' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma_1.prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        const token = (0, jwt_1.generateToken)({ id: user.id, role: user.role });
        res.status(201).json({
            status: 'success',
            data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token }
        });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }
        const token = (0, jwt_1.generateToken)({ id: user.id, role: user.role });
        res.status(200).json({
            status: 'success',
            data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token }
        });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
exports.login = login;
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ status: 'error', message: 'Token is required' });
        }
        const ticket = yield googleClient.verifyIdToken({
            idToken: token,
            audience: env_1.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            return res.status(400).json({ status: 'error', message: 'Invalid Google token' });
        }
        const { email, name } = payload;
        let user = yield prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            user = yield prisma_1.prisma.user.create({
                data: { email, name, password: null },
            });
        }
        const jwtToken = (0, jwt_1.generateToken)({ id: user.id, role: user.role });
        res.status(200).json({
            status: 'success',
            data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token: jwtToken }
        });
    }
    catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});
exports.googleLogin = googleLogin;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: 'success',
        data: { user: req.user }
    });
});
exports.getMe = getMe;
