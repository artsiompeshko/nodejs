import joi from 'joi';

export default schema => (req, res, next) => {
  const { error } = joi.validate(req.body, schema);

  if (error) {
    res.status(400).json(error);
  }

  next();
};
