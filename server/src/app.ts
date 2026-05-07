import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import { env } from './config/env';
import { logger } from './config/logger';
import authRoutes from './routes/authRoutes';
import cartRoutes from './routes/cartRoutes';
import wishlistRoutes from './routes/wishlistRoutes';
import recentlyViewedRoutes from './routes/recentlyViewedRoutes';
import orderRoutes from './routes/orderRoutes';
import addressRoutes from './routes/addressRoutes';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/recently-viewed', recentlyViewedRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/addresses', addressRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(env.PORT, () => {
  logger.info(`Server running on http://localhost:${env.PORT} in ${env.NODE_ENV} mode`);
});
