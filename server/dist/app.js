"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = require("./middlewares/errorHandler");
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const wishlistRoutes_1 = __importDefault(require("./routes/wishlistRoutes"));
const recentlyViewedRoutes_1 = __importDefault(require("./routes/recentlyViewedRoutes"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: env_1.env.CLIENT_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)(env_1.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/cart', cartRoutes_1.default);
app.use('/api/wishlist', wishlistRoutes_1.default);
app.use('/api/recently-viewed', recentlyViewedRoutes_1.default);
// Global Error Handler
app.use(errorHandler_1.errorHandler);
app.listen(env_1.env.PORT, () => {
    logger_1.logger.info(`Server running on http://localhost:${env_1.env.PORT} in ${env_1.env.NODE_ENV} mode`);
});
