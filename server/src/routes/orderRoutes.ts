import { Router } from 'express';
import { createOrder, getUserOrders, getUserStats } from '../controllers/orderController';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/stats', getUserStats);

export default router;
