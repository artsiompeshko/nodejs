import express from 'express';

import cookieParser from './middlewares/cookie-parsing';
import queryParser from './middlewares/query-parser';

import usersRouter from './routes/users.route';
import productsRouter from './routes/products.route';


const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser);
app.use(queryParser);

// routes
app.use('/users', usersRouter);
app.use('/products', productsRouter);

export default app;
