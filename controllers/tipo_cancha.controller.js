const { isAdmin } = require("../middlewares/check-admin");
module.exports = (app, db) => {
  // Middleware de seguridad: Solo los administradores pueden pasar
  

  // 1. READ: Mostrar el formulario y la lista
  app.get("/admin/tipos-cancha", isAdmin, async (req, res) => {
    try {
      // USAMOS db.tipoCancha EXACTAMENTE COMO LO EXPORTASTE
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

  // 2. CREATE: Guardar un nuevo tipo de cancha
  app.post("/admin/tipos-cancha", isAdmin, async (req, res) => {
    const { nombre } = req.body;
    try {
      // USAMOS db.tipoCancha
      await db.tipoCancha.create({ nombre });
      res.redirect("/admin/tipos-cancha");
    } catch (error) {
      console.error(error);
      res.redirect("/admin/tipos-cancha");
    }
  });

  // 3. DELETE: Eliminar un tipo de cancha
  app.post("/admin/tipos-cancha/delete/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      // USAMOS db.tipoCancha
      await db.tipoCancha.destroy({ where: { id } });
      res.redirect("/admin/tipos-cancha");
    } catch (error) {
      console.error(error);
      res.redirect("/admin/tipos-cancha");
    }
  });
};
