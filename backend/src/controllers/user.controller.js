import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const redirectUrl = async (req, res) => {
  try {
      const redirectUrl = `http://localhost:3000/products`;
      res.redirect(redirectUrl);
    } catch (error) {
    console.error('Error during redirect with tokens:', error);
    res.redirect('http://localhost:3000?error=authentication_failed');
  }
};
  
export const logout = async (req, res, next) => {
  req.logout((err) => {
      if (err) {
          return next(new ApiError(500, "Logout failed!"));
      }
      req.session.destroy((err) => {
          if (err) {
              return next(new ApiError(500, "Session destruction failed!"));
          }
          res.redirect('/'); // Redirect to home after logout
      });
  });
};
