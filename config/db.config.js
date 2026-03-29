const { Sequelize } = require("sequelize");

// Configuracion SQL
const sequelize = new Sequelize({
  /* Vamos a hacer la configuracion de la base de datos*/
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = {
  sequelize,
  Sequelize,
};
