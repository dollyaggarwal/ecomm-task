import { ApiError } from "../utils/ApiError.js";
export const isAuthenticated = (req, res,next) => {
    if (req.isAuthenticated()) {
       return next();
    }
    throw new ApiError(401, "Unauthorized: Please log in to access this resource");
}