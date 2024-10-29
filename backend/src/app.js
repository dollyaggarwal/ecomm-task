import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from 'express-session';
import passport from "./middlewares/passport.js";


//create app using express
const app = express();
//enviroment configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(session({
  secret: 'your_session_secret', // Replace with a strong secret
  resave: false,
  saveUninitialized: true,
}));
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(morgan("dev"));

 // Use the authentication router
 import userRouter from "./routes/user.routes.js";

 app.use(userRouter);
// Home route (optional)
app.get('/', (req, res) => {
    res.send(`<h1>Welcome</h1><a href="/auth/google">Log in with Google</a>`);
});

// Protected route example
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
      return res.redirect('/');
  }
  res.send(`<h1>Hello, ${req.user.displayName}</h1><p>Email: ${req.user.emails[0].value}</p>`);
});


export default app;
