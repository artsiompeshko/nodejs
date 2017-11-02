export default (req, res, next) => {
  req.parsedQuery = req.query;
  next();
};
