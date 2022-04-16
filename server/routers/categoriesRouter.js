import { json, Router } from "express";
const router = Router();
import db from "../database/createConnection.js";

router.get("/api/categories", async (req, res) => {
    const categories = await db.all("SELECT * FROM categories;");
 
    res.send({ data: categories });
});

router.get("/api/categories/:id", async (req, res) => {
    
    const categoryid = Number(req.params.id);
    const category = await db.get(`SELECT * FROM categories where id = ?;`, [categoryid]);
    if (category) {
        return res.send({ data: category });
    }
    res.send({ error: `No category by id: ${categoryid}` })
})

router.post("/api/categories", async (req, res) => {
    if (req.session.admin === true) {
        const { category } = req.body;
        const { changes } = await db.run(`INSERT INTO categories (category) VALUES (?);`, [category]);
        return res.send({ rowsAffected: changes });
    }
    res.send({error: "You are not authorized to make this request"})
});

router.patch("/api/categories/:id", async (req, res) => {
    if (req.session.admin === true) {
        const categoryid = Number(req.params.id);
        const foundCategory = await db.get(`SELECT * FROM categories where id = ?;`, [categoryid]);
        if (foundCategory) {
            const categoryToPatch = req.body;
            const { category } = { ...foundCategory, ...categoryToPatch};
            const { changes } = await db.run(`UPDATE categories
                SET category = ? WHERE id = ?;`, [category, categoryid]);
            return res.send({ rowsAffected: changes });
        };
        return res.send({error: `No category by id: ${categoryid}`})
    }
    res.send({error: "You are not authorized to make this request"})
});

router.delete("/api/categories/:id", async (req, res) => {
    if (req.session.admin === true) {
        const categoryid = Number(req.params.id);
        const { changes } = await db.run(`DELETE FROM categories WHERE id = ?`, categoryid);
        if (changes !== 0) {
            return res.send({ rowsDeleted: changes })
        }
        return res.send({error: `No category by id: ${categoryid}`})
    }
    res.send({error: "You are not authorized to make this request"})
});
export default router;