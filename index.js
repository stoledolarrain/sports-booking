const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
let ejs = require("ejs");
const db = require("./models");
const session = require("express-session");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

//configuracion de session
app.use(
  session({
    secret:
      "esta es la clave de encriptación de la sesión y puede ser cualquier texto",
  }),
);

//cargamos las rutas (Controladores)
require("./controllers")(app, db);

//sincronizamos la base de datos y arrancamos el servidor
db.sequelize
  .sync({
    //force: true // drop tables and recreate
  })
  .then(() => {
    console.log("db resync");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
