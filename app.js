const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(bodyParser.json())
  .use(cors());

app.get("/", (req, res) => {
  res.json("Hello, Heroku ! 👋");
});
app.get("/:id", async (req, res) => {
  var pgp = require("pg-promise")(/*options*/);
  var db = pgp(
    "postgresql://postgres:xi1ZjimUfFcEnLKr9ec3@containers-us-west-131.railway.app:7427/railway"
  );
  let fecha = new Date();
  fecha = new Date(fecha.getTime() - 6 * 60 * 60000);
  console.log(fecha);
  await db
    .any("INSERT INTO log(page,fecha) VALUES($1,$2)", [req.params.id, fecha])
    .then(function (data) {
      console.log("DATA:", data);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
    });

  res.json("Hello");
});

// On gère les routes 404.
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);
