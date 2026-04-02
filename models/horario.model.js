const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Horario = sequelize.define(
    "Horario",
    {
      fecha: {
        type: DataTypes.DATEONLY, // Solo guarda la fecha (YYYY-MM-DD)
        allowNull: false,
      },
      hora_inicio: {
        type: DataTypes.TIME, // Solo guarda la hora (HH:MM:SS)
        allowNull: false,
      },
      hora_fin: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      disponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "horarios",
      timestamps: false,
    },
  );
  return Horario;
};
