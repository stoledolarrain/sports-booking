const { sequelize, Sequelize } = require("../config/db.config");

// 1. Importamos todos los modelos
const usuario = require("./usuario.model")(sequelize);
const tipoCancha = require("./tipo_cancha.model")(sequelize);
const cancha = require("./cancha.model")(sequelize);
const horario = require("./horario.model")(sequelize);
const reserva = require("./reserva.model")(sequelize);
const resena = require("./resena.model")(sequelize);

// 2. Definimos las Relaciones (Las llaves foráneas)

// - Un Tipo de Cancha tiene muchas Canchas (tipo_id)
tipoCancha.hasMany(cancha, { foreignKey: "tipo_id" });
cancha.belongsTo(tipoCancha, { foreignKey: "tipo_id" });

// - Una Cancha tiene muchos Horarios (cancha_id)
cancha.hasMany(horario, { foreignKey: "cancha_id" });
horario.belongsTo(cancha, { foreignKey: "cancha_id" });

// - Un Usuario tiene muchas Reservas (usuario_id)
usuario.hasMany(reserva, { foreignKey: "usuario_id" });
reserva.belongsTo(usuario, { foreignKey: "usuario_id" });

// - Un Horario tiene una Reserva (horario_id)
horario.hasOne(reserva, { foreignKey: "horario_id" });
reserva.belongsTo(horario, { foreignKey: "horario_id" });

// - Un Usuario puede dejar muchas Reseñas (usuario_id)
usuario.hasMany(resena, { foreignKey: "usuario_id" });
resena.belongsTo(usuario, { foreignKey: "usuario_id" });

// - Una Cancha puede tener muchas Reseñas (cancha_id)
cancha.hasMany(resena, { foreignKey: "cancha_id" });
resena.belongsTo(cancha, { foreignKey: "cancha_id" });

// 3. Exportamos todo
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
