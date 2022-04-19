//Imports
import express from "express";
import helmet from "helmet";
import rateLimit from 'express-rate-limit'
import session from "express-session";
import cors from "cors";
import productsRouter from "./routers/productsRouter.js"
import profilesRouter from "./routers/profilesRouter.js"
import categoriesRouter from "./routers/categoriesRouter.js"
import path from "path";

//Variables
const app = express();
const PORT = process.env.PORT || 8080;

const baseLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 70, // Limit each IP to 70 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
const authLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 6, // Limit each IP to 5 requests per `window` (here, per 5 minutes)
	message: 'Too many login attepts, try again later.',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//Middleware
app.use(express.json())
app.use(express.static(path.resolve("../client/public")));
app.use(express.urlencoded({ extended: true }))
app.use(helmet());
app.use(baseLimiter);
app.use("/auth", authLimiter)
app.use(cors());
app.use(session({
    secret: 'boutique',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.use(productsRouter);
app.use(profilesRouter)
app.use(categoriesRouter)

app.listen(PORT, () => {
    console.log("Starting server on port:", PORT);
});