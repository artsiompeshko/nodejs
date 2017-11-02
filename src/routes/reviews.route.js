import { Router } from 'express';

const router = Router();

// router.use('/', (req, res, next) => {
//   if (!req.product) {
//     res.sendStatus(404);
//   }
//
//   next();
// });

router.get('/', (req, res) => {
  res.json(req.product.reviews);
});

export default router;
