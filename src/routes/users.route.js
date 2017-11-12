import { Router } from 'express';
import usersRepository from '../repositories/users';
import auth from '../middlewares/auth';

const router = Router();

// authentication is required
router.use('/', auth);

router.get('/', (req, res) => {
  res.json(usersRepository.getUsers());
});

export default router;
