const { checkUser } = require("../middlewares/check-users");
const { isAdmin } = require("../middlewares/check-admin");

module.exports = (app, db) => {
  
  // 1. VISTA: Formulario para nueva reseña
  app.get("/cliente/resena/:reservaId", checkUser, async (req, res) => {
    try {
      const reserva = await db.reserva.findByPk(req.params.reservaId, {
        include: [{ model: db.horario, include: [db.cancha] }]
      });
      res.render("cliente/nueva-resena", { reserva });
    } catch (error) {
      res.redirect("/mis-reservas");
    }
  });

  // 2. ACCIÓN: Guardar reseña y REDIRIGIR a Mis Reseñas
  app.post("/cliente/resena/:reservaId", checkUser, async (req, res) => {
    const { calificacion, comentario } = req.body;
    try {
      const reserva = await db.reserva.findByPk(req.params.reservaId, {
        include: [{ model: db.horario }]
      });

      await db.resena.create({
        calificacion,
        comentario,
        usuario_id: res.locals.userId,
        cancha_id: reserva.Horario.cancha_id 
      });

      // ¡Aquí el cambio! Redirigimos al historial de reseñas del cliente
      res.redirect("/cliente/mis-resenas");
    } catch (error) {
      res.redirect("/mis-reservas");
    }
  });

  // 3. VISTA CLIENTE: Ver solo mis reseñas
  app.get("/cliente/mis-resenas", checkUser, async (req, res) => {
    try {
      const misResenas = await db.resena.findAll({
        where: { usuario_id: res.locals.userId },
        include: [db.cancha]
      });
      res.render("cliente/mis-resenas", { resenas: misResenas });
    } catch (error) {
      res.redirect("/");
    }
  });

  // 4. VISTA ADMIN: Ver TODAS las reseñas del sistema
  app.get("/admin/resenas", isAdmin, async (req, res) => {
    try {
      const todas = await db.resena.findAll({
        include: [db.usuario, db.cancha]
      });
      res.render("admin/resenas", { resenas: todas });
    } catch (error) {
      res.redirect("/");
    }
  });
};