const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Resena = sequelize.define(
    "Resena",
    {
      calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5, // Valida que no pongan números fuera del 1 al 5
        },
      },
      comentario: {
        type: DataTypes.TEXT, // Usamos TEXT por si el comentario es largo
        allowNull: true,
      },
    },
    {
      tableName: "resenas",
      timestamps: false,
    },
  );
  return Resena;
};
