const { isAdmin } = require("../middlewares/check-admin");

module.exports = (app, db) => {
  app.get("/admin/canchas", isAdmin, async (req, res) => {
    try {
      const canchas = await db.cancha.findAll({
        include: [db.tipoCancha, db.horario],
      });

      const tipos = await db.tipoCancha.findAll();

      res.render("admin/canchas", {
        canchas: canchas,
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

  app.post("/admin/canchas", isAdmin, async (req, res) => {
    const { nombre, precio_por_hora, estado, tipo_id } = req.body;
    try {
      await db.cancha.create({ nombre, precio_por_hora, estado, tipo_id });
      res.redirect("/admin/canchas");
    } catch (error) {
      console.error(error);
      res.redirect("/admin/canchas");
    }
  });

  app.post("/admin/canchas/delete/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      await db.cancha.destroy({ where: { id } });
      res.redirect("/admin/canchas");
    } catch (error) {
      console.error(error);
      res.redirect("/admin/canchas");
    }
  });

  app.post("/admin/canchas/:id/horarios", isAdmin, async (req, res) => {
    const cancha_id = req.params.id;
    const { fecha, hora_inicio, hora_fin } = req.body;

    try {
      await db.horario.create({
        fecha,
        hora_inicio,
        hora_fin,
        cancha_id,
      });
      res.redirect("/admin/canchas");
    } catch (error) {
      console.error(error);
      res.redirect("/admin/canchas");
    }
  });

  app.post("/admin/horarios/delete/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      await db.horario.destroy({ where: { id } });
      res.redirect("/admin/canchas");
    } catch (error) {
      console.error(error);
      res.redirect("/admin/canchas");
    }
  });
};
