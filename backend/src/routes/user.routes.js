// authRouter.js
import { Router } from 'express';
import passport from '../middlewares/passport.js';

const router = Router();

// Route for Google authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to profile
        res.redirect('/profile');
    }
);

// Logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

export default router;
