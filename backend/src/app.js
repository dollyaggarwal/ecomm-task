import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "./middlewares/passport.js";
import { DB_NAME } from "./constant.js";

//create app using express
const app = express();
//enviroment configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

// Create your session store
const mongoStore = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    dbName:DB_NAME, 
    collectionName: 'sessions', // Name of the sessions collection
    ttl: 14 * 24 * 60 * 60, // = 14 days. Default
});

// Use the session store in your app
app.use(session({
    secret: 'my_session_secret', // Change this to a strong secret
    resave: false,
    saveUninitialized: false,
    store: mongoStore, // Store sessions in MongoDB
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000, // Cookie expiration set to 14 days
        httpOnly: true, // Prevent JavaScript access to cookies
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    },
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
 import productRouter from "./routes/products.routes.js";
import { isAuthenticated } from "./middlewares/auth.middleware.js";

  app.use(userRouter);
  app.use(productRouter);


// Home route (optional)
app.get('/', (req, res) => {
    res.send(`<h1>Welcome</h1><a href="/auth/google">Log in with Google</a>`);
});

// Protected route example
app.get('/products', isAuthenticated, (req, res) => {
  res.send(`<h1>Hello, ${req.user.displayName}</h1><p>Email: ${req.user.emails[0].value}</p>`);
});


export default app;
