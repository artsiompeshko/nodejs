import { Router } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import usersRepository from '../repositories/users';
import authValidationSchema from '../validation/user-auth-validation.schema';
import authValidation from '../middlewares/auth-validation';

const certificate = fs.readFileSync('./config/private.key');

const router = Router();

// authenticate
router.post('/', authValidation(authValidationSchema), async (req, res) => {
  const user = await usersRepository.getUserByLogin(req.body.login);
  const isValidUser = user && req.body.login === user.login && req.body.password === user.password;

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
