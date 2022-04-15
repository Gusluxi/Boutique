import { json, Router } from "express";
const router = Router();
import db from "../database/createConnection.js";

router.get("/api/products", async (req, res) => {
    const products = await db.all("SELECT * FROM products;");
 
    res.send({ data: products });
});

router.get("/api/products/:id", async (req, res) => {
    const productid = Number(req.params.id);
    const product = await db.get(`SELECT * FROM products where id = ?;`, [productid]);
    console.log(product);
    if (product) {
        return res.send({ data: product});
    }
    res.send({ error: `No product by id: ${productid}` })
})

router.post("/api/products", async (req, res) => {
    const { title, description, price, categoryid } = req.body;
    const { changes } = await db.run(`INSERT INTO products (title, description, price, categoryid) VALUES (?, ?, ?, ?);`, [title, description, price, categoryid]);
    res.send({ rowsAffected: changes });
});

router.patch("/api/products/:id", async (req, res) => {
    const productid = Number(req.params.id);
    const foundProduct = await db.get(`SELECT * FROM products where id = ?;`, [productid]);
    if (foundProduct) {
        const productToPatch = req.body;
        const { title, description, price, categoryid } = { ...foundProduct, ...productToPatch};
        const { changes } = await db.run(`UPDATE products
            SET title = ?, description = ?, price = ?, categoryid = ?
            WHERE id = ?;`, [title, description, price, categoryid, productid]);
        return res.send({ rowsAffected: changes });
    };
    res.send({error: `No product by id: ${productid}`})
});

router.delete("/api/products/:id", async (req, res) => {
    const productid = Number(req.params.id);
    const { changes } = await db.run(`DELETE FROM products WHERE id = ?`, productid);
    if (changes !== 0) {
        return res.send({ rowsDeleted: changes })
    }
    res.send({error: `No product by id: ${productid}`})
});
export default router;