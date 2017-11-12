import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import FACEBOOK_APP from '../constants/facebook/facebook.constants';

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP.ID,
  clientSecret: FACEBOOK_APP.SECRET,
  callbackURL: 'http://localhost:3000/login/facebook/callback',
}, (accessToken, refreshToken, profile, cb) => {
  cb(null, profile);
}));
