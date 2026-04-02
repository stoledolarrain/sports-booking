const { sequelize, Sequelize } = require("../config/db.config");

const usuario = require("./usuario.model")(sequelize);
const tipoCancha = require("./tipo_cancha.model")(sequelize);
const cancha = require("./cancha.model")(sequelize);
const horario = require("./horario.model")(sequelize);
const reserva = require("./reserva.model")(sequelize);
const resena = require("./resena.model")(sequelize);


tipoCancha.hasMany(cancha, { foreignKey: "tipo_id" });
cancha.belongsTo(tipoCancha, { foreignKey: "tipo_id" });

cancha.hasMany(horario, { foreignKey: "cancha_id" });
horario.belongsTo(cancha, { foreignKey: "cancha_id" });

usuario.hasMany(reserva, { foreignKey: "usuario_id" });
reserva.belongsTo(usuario, { foreignKey: "usuario_id" });

horario.hasOne(reserva, { foreignKey: "horario_id" });
reserva.belongsTo(horario, { foreignKey: "horario_id" });

usuario.hasMany(resena, { foreignKey: "usuario_id" });
resena.belongsTo(usuario, { foreignKey: "usuario_id" });

cancha.hasMany(resena, { foreignKey: "cancha_id" });
resena.belongsTo(cancha, { foreignKey: "cancha_id" });

module.exports = {
  usuario,
  tipoCancha,
  cancha,
  horario,
  reserva,
  resena,
  sequelize,
  Sequelize: sequelize.Sequelize,
};
