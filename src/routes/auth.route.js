import { Router } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import usersRepository from '../repositories/users';
import authValidationSchema from '../validation/user-auth-validation.schema';
import authValidation from '../middlewares/auth-validation';

const certificate = fs.readFileSync('./config/private.key');

const router = Router();

// authenticate
router.post('/', authValidation(authValidationSchema), (req, res) => {
  const user = usersRepository.getUserByLogin(req.body.login);
  const isValidUser = user && user.compare(req.body);

  if (isValidUser) {
    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, certificate, { expiresIn: 10000 });

    res.send(token);
  } else {
    res.status(403).json({
      success: false,
      message: 'Bad login / password',
    });
  }
});

export default router;
