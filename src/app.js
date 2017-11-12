import express from 'express';
import passport from 'passport';
import expressSession from 'express-session';

import cookieParser from './middlewares/cookie-parsing';
import queryParser from './middlewares/query-parser';

import './passport/passport-local';
import './passport/passport-facebook';
import './passport/passport-twitter';
import './passport/passport-google';

import usersRouter from './routes/users.route';
import productsRouter from './routes/products.route';
import authRouter from './routes/auth.route';
import loginRouter from './routes/login.route';

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser);
app.use(queryParser);
app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession({
  secret: 'very secret',
}));

// routes
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use('/login', loginRouter);

export default app;
