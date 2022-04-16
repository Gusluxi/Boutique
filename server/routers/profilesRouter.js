import { json, Router } from "express";
import { loginRouter, signupRouter } from "../password.js"
const router = Router();
const saltRounds = 12;
import db from "../database/createConnection.js";



router.get("/api/profiles", async (req, res) => {
    if (req.session.admin === true) {
        const profiles = await db.all("SELECT * FROM profiles;");
        return res.send({ data: profiles });
    }
    res.send({error: "You are not authorized to make this request"})
});

router.get("/api/profiles/:id", async (req, res) => {
    const profileid = Number(req.params.id);
    if (req.session.admin === true) {
        const profile = await db.get(`SELECT * FROM profiles where id = ?;`, [profileid]);
        if (profile) {
            return res.send({ data: profile});
        }
        return res.send({ error: `No profile by id: ${profileid}` });
    }
    res.send({error: "You are not authorized to make this request"})
});

router.get("/auth/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.admin = false;
        req.session.loggedIn = false;
        req.session.userID = undefined;
        return res.send({ loggedIn: false})
    }
    res.send({ error: "You are currently not logged in"})
})

router.post("/auth/login", async (req, res) => {
    const { username, plainPassword } = req.body;
    const user = await db.get(`SELECT * FROM profiles WHERE username = ?`, [username])
    req.session.loggedIn = loginRouter(plainPassword, user.password);
    if (req.session.loggedIn) {
        req.session.userID = user.id;
        req.session.admin = user.admin;
        user.password = '';
        return res.send({ loggedIn: true, currentUser: user })
    };
    res.send({ loggedIn: false})
});



router.post("/auth/signup", async (req, res) => {
    const newUser = req.body;
    if (newUser.email && newUser.username && newUser.password) {
        const hashedPassword = signupRouter(newUser.password, saltRounds)
        const { changes } = await db.run(`INSERT INTO profiles (username, email, password) VALUES (?, ?, ?);`, [newUser.username, newUser.email, hashedPassword]);
        return res.send({ usersAdded: changes })
    }
    res.send({ error: "Missing user data"})
});

router.post("/api/profiles", async (req, res) => {
    if (req.session.admin === true) {
        const { username, email, password, admin } = req.body;
        const { changes } = await db.run(`INSERT INTO profiles (username, email, password) VALUES (?, ?, ?, ?);`, [username, email, password, admin]);
        return res.send({ rowsAffected: changes });
    };
    res.send({error: "You are not authorized to make this request"})
});    

router.patch("/api/profiles/:id", async (req, res) => {
    if (req.session.loggedIn === true) {
        let profileid;
        if (req.session.admin === true) {
            profileid = Number(req.params.id);
        } else {
            profileid = req.session.userID;
        } 
        const foundProfile = await db.get(`SELECT * FROM profiles where id = ?;`, [profileid]);
        if (foundProfile) {
            const profileToPatch = req.body;
            const { username, email, password } = { ...foundProfile, ...profileToPatch};
            const { changes } = await db.run(`UPDATE profiles
                SET username = ?, email = ?, password = ?
                WHERE where id = ?;`, [username, email, password, profileid]);
            return res.send({ rowsAffected: changes, changedForUserID: profileid });
        };
        return res.send({error: `No profile by id: ${profileid}`})
    }
    res.send({error: "You are not authorized to make this request"})
});

router.delete("/api/profiles/:id", async (req, res) => {
    if (req.session.loggedIn === true) {
        let profileid;
        if (req.session.admin === true) {
            profileid = Number(req.params.id);
        } else {
            profileid = req.session.userID;
        } 
        const { changes } = await db.run(`DELETE FROM profiles WHERE id = ?`, profileid);
        if (changes !== 0) {
            return res.send({ rowsDeleted: changes, changedForUserID: profileid })
        }
        return res.send({error: `No profile by id: ${profileid}`})
    }
    res.send({error: "You are not authorized to make this request"})
});

export default router;