import { Router } from 'express';
import { createAddress, getAddresses } from '../controllers/addressController';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

router.post('/', createAddress);
router.get('/', getAddresses);

export default router;
