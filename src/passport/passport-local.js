import passport from 'passport';
import LocalStrategy from 'passport-local';
import usersRepository from '../repositories/users';

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password',
  session: false,
}, (login, password, done) => {
  const user = usersRepository.getUserByLogin(login);
  const isValidUser = user && user.compare({
    login,
    password,
  });

  if (!isValidUser) {
    done(null, false, 'Bad login / password');
  }

  done(null, user);
}));
