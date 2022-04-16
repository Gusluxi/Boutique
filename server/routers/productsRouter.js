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
    if (product) {
        return res.send({ data: product});
    }
    res.send({ error: `No product by id: ${productid}` })
})

router.get("/api/products/categories/:id", async (req, res) => {
    const categoryid = Number(req.params.id);
    const products = await db.all(`SELECT * FROM products where categoryid = ?;`, [categoryid]);
    if (products) {
        return res.send({ data: products });
    }
    res.send({ error: `No product by id: ${categoryid}` })
})

router.post("/api/products", async (req, res) => {
    if (req.session.admin === true) {
        const { title, description, price, categoryid } = req.body;
        const { changes } = await db.run(`INSERT INTO products (title, description, price, categoryid) VALUES (?, ?, ?, ?);`, [title, description, price, categoryid]);
        return res.send({ rowsAffected: changes });
    }
    res.send({error: "You are not authorized to make this request"})
});

router.patch("/api/products/:id", async (req, res) => {
    if (req.session.admin === true) {
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
        return res.send({error: `No product by id: ${productid}`})
    }
    res.send({error: "You are not authorized to make this request"})
});

router.delete("/api/products/:id", async (req, res) => {
    if (req.session.admin === true) {
        const productid = Number(req.params.id);
        const { changes } = await db.run(`DELETE FROM products WHERE id = ?`, productid);
        if (changes !== 0) {
            return res.send({ rowsDeleted: changes })
        }
        return res.send({error: `No product by id: ${productid}`})
    }
    res.send({error: "You are not authorized to make this request"})
});

export default router;