import { json, Router } from "express";
const router = Router();
import db from "../database/createConnection.js";

router.get("/api/profiles", async (req, res) => {
    const profiles = await db.all("SELECT * FROM profiles;");
 
    res.send({ data: profiles });
});

router.get("/api/profiles/:id", async (req, res) => {
    const profileid = Number(req.params.id);
    const profile = await db.get(`SELECT * FROM profiles where id = ?;`, [profileid]);
    console.log(profile);
    if (profile) {
        return res.send({ data: profile});
    }
    res.send({ error: `No profile by id: ${profileid}` })
})

router.post("/api/profiles", async (req, res) => {
    const { username, email, password } = req.body;
    const { changes } = await db.run(`INSERT INTO profiles (username, email, password) VALUES (?, ?, ?);`, [username, email, password]);
    res.send({ rowsAffected: changes });
});

router.patch("/api/profiles/:id", async (req, res) => {
    const profileid = Number(req.params.id);
    const foundProfile = await db.get(`SELECT * FROM profiles where id = ?;`, [profileid]);
    if (foundProfile) {
        const profileToPatch = req.body;
        const { username, email, password } = { ...foundProfile, ...profileToPatch};
        const { changes } = await db.run(`UPDATE profiles
            SET username = ?, email = ?, password = ?
            WHERE where id = ?;`, [username, email, password, profileid]);
        return res.send({ rowsAffected: changes });
    };
    res.send({error: `No profile by id: ${profileid}`})
});

router.delete("/api/profiles/:id", async (req, res) => {
    const profileid = Number(req.params.id);
    const { changes } = await db.run(`DELETE FROM profiles WHERE id = ?`, profileid);
    if (changes !== 0) {
        return res.send({ rowsDeleted: changes })
    }
    res.send({error: `No profile by id: ${profileid}`})
});

export default router;