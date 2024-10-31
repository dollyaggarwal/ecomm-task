import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { callbackURL } from '../constant.js';
import passport from 'passport';


passport.use(new GoogleStrategy({
    clientID: process.env.YOUR_GOOGLE_CLIENT_ID,
    clientSecret: process.env.YOUR_GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL,
}, (accessToken, refreshToken, profile, done) => {
    const user = {
        profile,
        accessToken, 
        refreshToken,
      };
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;