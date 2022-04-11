import db from "./createConnection.js";

const isInDeleteMode = true;

if (isInDeleteMode) {
    db.exec("DROP TABLE IF EXISTS products;");
    db.exec("DROP TABLE IF EXISTS categories;");
    db.exec("DROP TABLE IF EXISTS ;");
}

db.exec(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(70));`
); 
db.exec(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(70));`
); 
db.exec(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(70));`
); 

// Seed
if (isInDeleteMode) {
    db.run("INSERT INTO products (name) VALUES ('phone')");
}
if (isInDeleteMode) {
    db.run("INSERT INTO products (name) VALUES ('phone')");
}
if (isInDeleteMode) {
    db.run("INSERT INTO products (name) VALUES ('phone')");
}

db.close();

