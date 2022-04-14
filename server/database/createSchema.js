import db from "./createConnection.js";

const isInDeleteMode = true;

if (isInDeleteMode) {
    db.exec("DROP TABLE IF EXISTS products;");
    db.exec("DROP TABLE IF EXISTS categories;");
    db.exec("DROP TABLE IF EXISTS profiles;");
}

db.exec(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100),
    price DOUBLE);`
); 
db.exec(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category VARCHAR(70));`
); 
db.exec(`CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(70));`
); 

// Seed
if (isInDeleteMode) {
    db.run("INSERT INTO products (title, price) VALUES ('phone', 24.5)");

}
if (isInDeleteMode) {
    db.run("INSERT INTO categories (category) VALUES ('animals')");
}
if (isInDeleteMode) {
    db.run("INSERT INTO products (username) VALUES ('Joe')");
}

db.close();

