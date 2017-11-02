import { Router } from 'express';
import usersRepository from '../repositories/users';

const router = Router();

router.get('/', (req, res) => {
  res.json(usersRepository.getUsers());
});

export default router;
