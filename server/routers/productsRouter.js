import { json, Router } from "express";
const router = Router();
import db from "../database/createConnection.js";

router.get("/api/products", async (req, res) => {
    const players = await db.all("SELECT * FROM products;");
 
    res.send({ data: players });
});

router.post("/api/products", async (req, res) => {
    const { name } = req.body;

    const { changes } = await db.run(`INSERT INTO products (name) VALUES (?);`, [name]);

    res.send({ rowsAffected: changes });
});


export default router;