import cookies from '../utils/cookies';

export default (req, res, next) => {
  req.parsedCookies = cookies.parseCookies(req.headers.cookie);
  next();
};
