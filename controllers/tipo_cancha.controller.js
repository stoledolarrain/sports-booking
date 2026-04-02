const { isAdmin } = require("../middlewares/check-admin");

module.exports = (app, db) => {
  app.get("/admin/tipos-cancha", isAdmin, async (req, res) => {
    try {
      const tipos = await db.tipoCancha.findAll();

      res.render("admin/tipos-cancha", {
        tipos: tipos,
        userId: req.session.user.id,
        userEmail: req.session.user.email,
        userRol: req.session.user.rol,
      });
    } catch (error) {
      console.error(error);
      res.send("Ocurrió un error al cargar la página");
    }
  });

  app.post("/admin/tipos-cancha", isAdmin, async (req, res) => {
    const { nombre } = req.body;
    try {
      await db.tipoCancha.create({ nombre });
      res.redirect("/admin/tipos-cancha");
    } catch (error) {
      console.error(error);
      res.redirect("/admin/tipos-cancha");
    }
  });

  app.post("/admin/tipos-cancha/delete/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      await db.tipoCancha.destroy({ where: { id } });
      res.redirect("/admin/tipos-cancha");
    } catch (error) {
      console.error(error);
      res.redirect("/admin/tipos-cancha");
    }
  });
};
