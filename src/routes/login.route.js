import { Router } from 'express';
import passport from 'passport';
import authValidationSchema from '../validation/user-auth-validation.schema';
import authValidation from '../middlewares/auth-validation';

const router = Router();

router.post(
  '/',
  authValidation(authValidationSchema),
  passport.authenticate('local', { session: false }),
  (req, res) => {
    res.json(req.user);
  },
);

router.get(
  '/facebook',
  passport.authenticate('facebook', { session: false }),
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    res.json(req.user);
  },
);

router.get(
  '/twitter',
  passport.authenticate('twitter', { session: false }),
);

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  (req, res) => {
    res.json(req.user);
  },
);

router.get(
  '/google',
  passport.authenticate('google', { session: false, scope: ['profile'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    res.json(req.user);
  },
);

export default router;
