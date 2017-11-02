import Product from '../models/product';
import generateId from '../helpers/id-generator';

const products = [];
const nextId = generateId();

// initial state
products.push(new Product({
  id: nextId(),
  reviews: ['Initial Review'],
}));

const addProduct = ({ reviews = [] }) => {
  const newProduct = new Product({
    id: nextId(),
    reviews,
  });

  products.push(newProduct);

  return newProduct;
};

const getProduct = queryId => products.filter(({ id }) => +id === +queryId)[0];
const getProducts = () => products;

export default {
  addProduct,
  getProduct,
  getProducts,
};
