module.exports = (app, db) => {
  app.get("/login", (req, res) => {
    res.render("auth/form-login");
  });

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Recuerda que lo exportamos como db.usuario
    const usuario = await db.usuario.findOne({
      where: { email },
    });

    // Esta validación debe ir DENTRO de la función app.post
    if (!usuario) {
      return res.render("auth/form-login", { error: "Usuario no encontrado" });
    }

    const encodedPassword = require("../utils/text.utils").sha1Encode(password);

    if (encodedPassword !== usuario.password) {
      return res.render("auth/form-login", { error: "Contraseña incorrecta" });
    }

    req.session.user = {
      id: usuario.id,
      email: usuario.email,
    };
    res.redirect("/");
  });
};
