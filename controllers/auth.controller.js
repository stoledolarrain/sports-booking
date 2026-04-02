const { sha1Encode } = require("../utils/text.utils");

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

    if (encodedPassword !== usuario.contrasena) {
      return res.render("auth/form-login", { error: "Contraseña incorrecta" });
    }

    req.session.user = {
      id: usuario.id,
      email: usuario.email,
    };
    res.redirect("/");
  });

  app.get("/register", (req, res) => {
    res.render("auth/form-register");
  });
  app.post("/register", async (req, res) => {
    const { nombre, email, password } = req.body;

    const existingUser = await db.usuario.findOne({ where: { email } });
    if (existingUser) {
      return res.render("auth/form-register", {
        error: "El email ya está registrado",
      });
    }

    const encodedPassword = sha1Encode(password);

    await db.usuario.create({
      nombre: nombre,
      email: email,
      contrasena: encodedPassword,
      rol: "cliente",
    });

    res.redirect("/login");
  });

  app.get("/logout", (req, res) => {
    req.session.user = null;
    res.redirect("/login");
  });
};
