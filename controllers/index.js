module.exports = (app, db) => {
  require("./home.controller")(app);
  require("./auth.controller")(app, db);
  require("./tipo_cancha.controller")(app, db);
  require("./cancha.controller")(app, db);
  require("./reserva.controller")(app, db);
  require("./resena.controller")(app, db);
};
