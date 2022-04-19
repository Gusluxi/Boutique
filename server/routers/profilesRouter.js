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
    console.log(req.session);
    if (req.session.loggedIn) {
        req.session.admin = false;
        req.session.loggedIn = false;
        req.session.userID = undefined;
        req.session.save();
        return res.send({ loggedIn: false})
    }
    res.send({ error: "You are currently not logged in"})
})

router.post("/auth/login", async (req, res) => {
    const body = req.body;
    console.log(body);
    const user = await db.get(`SELECT * FROM profiles WHERE username = ?`, [body.username])
    console.log(user);
    if (!user) {
        req.session.loggedIn = false;
    } else {
        const authorized = await loginRouter(body.password, user.password);
        req.session.loggedIn = authorized;
    }
    if (req.session.loggedIn) {
        req.session.userID = user.id;
        req.session.admin = user.admin;
        user.password = '';
        console.log(req.session);
        req.session.save();
        return res.send({ loggedIn: true, currentUser: user, remaining: req.rateLimit.remaining })
    };
    res.send({ loggedIn: false, remaining: req.rateLimit.remaining })
});



router.post("/auth/signup", async (req, res) => {
    const newUser = req.body;
    if (newUser.email && newUser.username && newUser.password) {
        const hashedPassword = await signupRouter(newUser.password, saltRounds)
        const { changes } = await db.run(`INSERT INTO profiles (username, email, password) VALUES (?, ?, ?);`, [newUser.username, newUser.email, hashedPassword]);
        return res.send({ rowsAffected: changes })
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
    console.log(req.session);
    if (req.session.loggedIn === true) {
        let profileid;
        if (req.session.admin === true) {
            profileid = Number(req.params.id);
        } else {
            profileid = req.session.userID;
        } 
        console.log(profileid);
        const foundProfile = await db.get(`SELECT * FROM profiles WHERE id = ?;`, [profileid]);
        if (foundProfile) {
            const profileToPatch = req.body;
            const { username, email, password } = { ...foundProfile, ...profileToPatch};
            const { changes } = await db.run(`UPDATE profiles
                SET username = ?, email = ?, password = ?
                WHERE id = ?;`, [username, email, password, profileid]);
            req.session.save();
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