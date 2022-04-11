import express from "express";
const app = express();

// import cors from "cors";
// app.use(cors());

app.use(express.json());

import path from "path";
app.use(express.static(path.resolve("../client/public")));

import productsRouter from "./routers/productsRouter.js"
app.use(productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Starting server on port:", PORT);
});