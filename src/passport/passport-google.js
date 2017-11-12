import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import GOOGLE_APP from '../constants/google/google.constants';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_APP.ID,
  clientSecret: GOOGLE_APP.SECRET,
  callbackURL: 'http://localhost:3000/login/google/callback',
}, (accessToken, refreshToken, profile, cb) => {
  cb(null, profile);
}));
