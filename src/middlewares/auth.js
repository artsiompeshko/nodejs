import jwt from 'jsonwebtoken';
import fs from 'fs';

const certificate = fs.readFileSync('./config/private.key');

export default (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(403).send({
      success: false,
      message: 'No token',
    });
  }

  jwt.verify(token, certificate, (err) => {
    if (err) {
      res.status(401).send({
        success: false,
        message: 'Failed to auth passed token',
      });
    }

    next();
  });
};
