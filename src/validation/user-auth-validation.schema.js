import joi from 'joi';

export default joi.object().keys({
  login: joi.string().alphanum().min(3).max(30)
    .required(),
  password: joi.string().min(6).max(30)
    .required(),
});
