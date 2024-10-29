import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { callbackURL } from '../constant.js';
import passport from 'passport';

// Google OAuth configuration
passport.use(new GoogleStrategy({
    clientID: process.env.YOUR_GOOGLE_CLIENT_ID,
    clientSecret: process.env.YOUR_GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL,
}, (accessToken, refreshToken, profile, done) => {
    // Handle user information here (e.g., save to DB)
    return done(null, profile);
}));
// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;