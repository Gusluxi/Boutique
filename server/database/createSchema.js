import db from "./createConnection.js";

const isInDeleteMode = true;

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
    username VARCHAR(70) NOT NULL,
    email VARCHAR(120) NOT NULL,
    password VARCHAR(120) NOT NULL);`
); 

// Seed
if (isInDeleteMode) {
    db.run("INSERT INTO categories (category) VALUES ('technology')");
    db.run("INSERT INTO products (title, description, price, categoryid) VALUES ('phone', 'Useful for connectiong with people on the fly', 24.5, 1)");
    db.run("INSERT INTO profiles (username, email, password) VALUES ('Joe', 'mama@mail.com', 'string of bycrypt letters and numbers')");
}


db.close();

