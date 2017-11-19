import { Router } from 'express';
import reviewsRouter from './reviews.route';
import productsRepository from '../repositories/products';
import auth from '../middlewares/auth';

const router = Router();

// authentication is required
router.use('/', auth);

// extract user
router.use('/:id', async (req, res, next) => {
  req.product = await productsRepository.getProduct(req.params.id);
  next();
});

// reviwes route
router.use('/:id/reviews', reviewsRouter);

router.get('/', async (req, res) => {
  const products = await productsRepository.getProducts();
  res.json(products);
});

router.post('/', async (req, res) => {
  const newProduct = await productsRepository.addProduct({
    reviews: req.body.reviews || [],
  });

  res.json(newProduct);
});

router.get('/:id', (req, res) => {
  if (req.product) {
    res.json(req.product);
  }

  res.sendStatus(404);
});

export default router;
