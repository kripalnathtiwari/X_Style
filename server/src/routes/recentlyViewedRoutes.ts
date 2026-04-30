import { Router } from 'express';
import { getRecentlyViewed, addRecentlyViewed } from '../controllers/recentlyViewedController';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

router.get('/', getRecentlyViewed);
router.post('/add', addRecentlyViewed);

export default router;
