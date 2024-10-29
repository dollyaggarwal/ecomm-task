// authRouter.js
import { Router } from 'express';
import { logout, redirectUrl } from '../controllers/user.controller.js';
import passport from "../middlewares/passport.js";

const router = Router();

// Route for Google authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),redirectUrl
);

// Logout route
router.get('/logout', logout);

export default router;
