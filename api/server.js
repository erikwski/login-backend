const express = require("express");
const app = express();
const mysql = require("mysql2");
var cors = require("cors");

app.use(cors());
app.use(express.json());

const DB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "wski_project",
});
// DB.query("SELECT * FROM users", function (err, results, fields) {
//   console.log(results);
// });
app.get("/login", (req, res) => {
  let user = req.query.user;
  let pwd = req.query.pwd;
  try {
    DB.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [user, pwd],
      (err, results) => {
        if (results.length) {
          res.status(200).json({
            status: true,
            msg: "Login avvenuto correttamente",
            user: results[0],
          });
        } else {
          console.log(res.statusCode);
          res.status(200).json({
            status: false,
            msg: "Credenziali errate",
            user: {},
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      msg: "Errore durante il processo di autenticazione",
      user: {},
    });
  }
});
app.post("/update", (req, res) => {
  let id = req.body.id;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let type = req.body.type;
  let language = req.body.language;
  try {
    DB.query(
      `UPDATE users 
        SET username = ?,
        email = ?,
        password = ?,
        type = ?,
        language = ?
        WHERE id = ?`,
      [username, email, password, type, language, id],
      (err, results) => {
        if (err) {
          res.status(400).json({
            status: false,
            msg: "Errore durante l'update, riprovare più tardi",
          });
        } else {
          res.status(200).json({
            status: true,
            msg: "Update avvenuto correttamente",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      msg: "Errore durante il processo di autenticazione",
      user: {},
    });
  }
});

app.listen(4000, () => console.log("Hosting server on localhost:4000"));
