import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import TWITTER_APP from '../constants/twitter/twitter.constants';

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_APP.CONSUMER_KEY,
  consumerSecret: TWITTER_APP.CONSUMER_SECRET,
  callbackURL: 'http://localhost:3000/login/twitter/callback',
}, (accessToken, refreshToken, profile, cb) => {
  cb(null, profile);
}));
