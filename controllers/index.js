module.exports = (app, db) => {
  // Como ya estamos en la carpeta controllers, solo llamamos al archivo directamente:
  require("./home.controller")(app);
  require("./auth.controller")(app, db);
  require("./usuario.controller")(app, db);
  
  /* require("./tipo_cancha.controller")(app, db);
  require("./cancha.controller")(app, db);
  require("./horario.controller")(app, db);
  require("./reserva.controller")(app, db);
  require("./resena.controller")(app, db); 
  */
};