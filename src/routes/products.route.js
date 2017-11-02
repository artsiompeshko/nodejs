import { Router } from 'express';
import reviewsRouter from './reviews.route';
import productsRepository from '../repositories/products';

const router = Router();

// extract user
router.use('/:id', (req, res, next) => {
  req.product = productsRepository.getProduct(req.params.id);
  next();
});

// reviwes route
router.use('/:id/reviews', reviewsRouter);

router.get('/', (req, res) => {
  res.json(productsRepository.getProducts());
});

router.post('/', (req, res) => {
  res.json(productsRepository.addProduct({
    reviews: req.body.reviews || [],
  }));
});

router.get('/:id', (req, res) => {
  if (req.product) {
    res.json(req.product);
  }

  res.sendStatus(404);
});

export default router;
