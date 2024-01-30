const express = require("express");
var cors = require("cors");
const app = express();
const mariadb = require("mariadb");
const bodyParser = require("body-parser");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1uXGut4e>M6dZaS)#`Pw8sVl]=&W<R(B",
  port: 3306,
  connectionLimit: 5,
  database: "tutorial",
});

app.use(cors());
app.use(bodyParser.json());

const port = 3000;

async function getUsers() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM Users");
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
}

async function addUser(username, password) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      `INSERT INTO Users (Username, Password) VALUES ("${username}", "${password}");`
    );
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  res.send("<h1>hello</h1>");
});

app.get("/users", async (req, res) => {
  const rows = await getUsers();
  res.send(rows);
});

app.post("/users", async (req, res) => {
  const username = req.body.Username;
  const password = req.body.Password;
  const rows = await addUser(username, password);
  res.send(`${rows}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
