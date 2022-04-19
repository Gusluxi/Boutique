import db from "./createConnection.js";
import { signupRouter } from "../password.js"

const plainAdminPassword = "adminpassword";
const plainBasicPassword = "gustavpassword";
const isInDeleteMode = true;
const saltRounds = 12;

if (isInDeleteMode) {
    db.exec(`DROP TABLE IF EXISTS categories;`);
    db.exec(`DROP TABLE IF EXISTS products;`);
    db.exec(`DROP TABLE IF EXISTS profiles;`);
}

await db.exec(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category VARCHAR(70) NOT NULL);`
); 

await db.exec(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(250),
    price DOUBLE NOT NULL,
    categoryid INTEGER,
    FOREIGN KEY(categoryid) REFERENCES categories(id));`
); 

await db.exec(`CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(320) NOT NULL,
    password VARCHAR(72) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT false);`
); 

// Seed
if (isInDeleteMode) {
    const hashedAdminPassword = await signupRouter(plainAdminPassword, saltRounds)
    const hashedGustavPassword = await signupRouter(plainBasicPassword, saltRounds)
    db.run(`INSERT INTO categories (category) VALUES 
    ('Technology'), ('Animals'), ('Clothing'), ('Accessories'), 
    ('Food & Drinks'), ('Websites'), ('Instruments')`);
    db.run(`INSERT INTO products (title, description, price, categoryid) VALUES 
    ('Phone', 'Useful for connectiong with people on the fly', 2400.5, 1),
    ('Computer', 'Connect to the web', 5450.5, 1),
    ('Kitten', 'Cute kitten to adopt', 3000, 2),
    ('Turtle', 'Entertaining animal to study', 7050.5, 2),
    ('Trousers', 'Everyone needs some good trousers', 25.25, 3),
    ('Socks', 'Nothing like new socks', 19.95, 3),
    ('Cap', 'Spares your eyes from sunlight', 20, 4),
    ('Earings', 'Adviced for people with holes in their ears', 52.75, 4),
    ('Cheese Cake', 'Very delecious cake', 15, 5),
    ('Ginger Beer', 'Used for drinks, but is also good for your stomach', 5.5, 5),
    ('Google.com', 'Web domain is probably pretty expensive', 950500.5, 6),
    ('Samelle-tis.com', 'Web domain for a tissue company', 15000.10, 6),
    ('Piano', 'Very musical piano with all the sounds', 3400.35, 7),
    ('Trumpet', 'Makes a funny sound', 800.10, 7)
    `);
    db.run(`INSERT INTO profiles (username, email, password, admin) VALUES 
    ('admin', 'admin@gmail.com', ?, true), 
    ('gustav', 'gullegustav@gmail.com', ?, false)`, [hashedAdminPassword, hashedGustavPassword]);
}

db.close();

