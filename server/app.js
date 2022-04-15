import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

// import cors from "cors";
// app.use(cors());

app.use(express.json());

import path from "path";
app.use(express.static(path.resolve("../client/public")));

import productsRouter from "./routers/productsRouter.js"
import profilesRouter from "./routers/profilesRouter.js"
import categoriesRouter from "./routers/categoriesRouter.js"

app.use(productsRouter, profilesRouter, categoriesRouter);


app.listen(PORT, () => {
    console.log("Starting server on port:", PORT);
});