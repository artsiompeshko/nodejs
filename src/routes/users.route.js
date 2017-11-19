import { Router } from 'express';
import usersRepository from '../repositories/users';
import auth from '../middlewares/auth';

const router = Router();

// authentication is required
router.use('/', auth);

router.get('/', async (req, res) => {
  const users = await usersRepository.getUsers();
  res.json(users);
});

export default router;
