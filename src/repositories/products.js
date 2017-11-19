import { Product } from '../../models';

const addProduct = async ({ reviews = [] }) => Product.create({
  reviews,
});

const getProduct = async id => Product.findById(id);
const getProducts = async () => Product.findAll();

export default {
  addProduct,
  getProduct,
  getProducts,
};
