import { ApiError } from '../utils/ApiError.js';

export const redirectUrl = async  (req, res) => {
  // Successful authentication, redirect to profile
  console.log(req.user,"response");
  res.status(200).cookie()
  res.redirect('/products');
}
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
