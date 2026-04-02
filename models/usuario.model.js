const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // rol (admin / cliente)
      rol: {
        type: DataTypes.ENUM("admin", "cliente"),
        allowNull: false,
        defaultValue: "cliente",
      },
    },
    {
      tableName: "usuarios",
      timestamps: false,
    },
  );

  return Usuario;
};
