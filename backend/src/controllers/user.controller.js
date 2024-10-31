import { ApiError } from '../utils/ApiError.js';

export const redirectUrl = async (req, res) => {
  try {
    // const accessToken = req.user.accessToken;
    // const refreshToken = req.user.refreshToken;
      console.log(req.user)
    // if (!accessToken || !refreshToken) {
    //   throw new Error('Tokens not found');
    // }

    res.redirect('http://localhost:3000/products');
  } catch (error) {
    console.error('Error during redirect with tokens:', error);
    res.redirect('http://localhost:3000/products?error=authentication_failed');
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
