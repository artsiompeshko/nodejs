export default class Product {
  constructor({ id, reviews }) {
    this.id = id;
    this.reviews = reviews || [];
  }
}
