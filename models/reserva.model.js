const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Reserva = sequelize.define(
    "Reserva",
    {
      estado: {
        type: DataTypes.ENUM("confirmada", "cancelada", "completada"),
        allowNull: false,
        defaultValue: "confirmada",
      },
    },
    {
      tableName: "reservas",
      timestamps: false,
    },
  );
  return Reserva;
};
