const { checkUser } = require("../middlewares/check-users");
const { isAdmin } = require("../middlewares/check-admin");

module.exports = (app, db) => {
  app.get("/reservar", checkUser, async (req, res) => {
    try {
      const canchas = await db.cancha.findAll({
        where: { estado: "activa" },
        include: [
          { model: db.tipoCancha },
          {
            model: db.horario,
            where: { disponible: true },
            required: false,
          },
        ],
      });

      res.render("cliente/reservar", {
        canchas: canchas,
        userId: res.locals.userId,
        userEmail: res.locals.userEmail,
        userRol: res.locals.userRol,
      });
    } catch (error) {
      console.error(error);
      res.send("Ocurrió un error al cargar las reservas.");
    }
  });

  app.post("/reservar/:horario_id", checkUser, async (req, res) => {
    const { horario_id } = req.params;
    const usuario_id = res.locals.userId;

    try {
      await db.reserva.create({
        usuario_id: usuario_id,
        horario_id: horario_id,
        estado: "confirmada",
      });

      await db.horario.update(
        { disponible: false },
        { where: { id: horario_id } },
      );

      res.redirect("/mis-reservas");
    } catch (error) {
      console.error(error);
      res.send("Hubo un problema al procesar tu reserva.");
    }
  });
  app.get("/mis-reservas", checkUser, async (req, res) => {
    try {
      const misReservas = await db.reserva.findAll({
        where: { usuario_id: res.locals.userId },
        include: [
          {
            model: db.horario,
            include: [{ model: db.cancha }],
          },
        ],
      });

      res.render("cliente/mis-reservas", {
        reservas: misReservas,
        userId: res.locals.userId,
        userEmail: res.locals.userEmail,
        userRol: res.locals.userRol,
      });
    } catch (error) {
      console.error(error);
      res.send("Ocurrió un error al cargar tus reservas.");
    }
  });

  app.post("/reservas/cancelar/:id", checkUser, async (req, res) => {
    try {
      const reserva = await db.reserva.findOne({
        where: { id: req.params.id },
      });

      if (reserva) {
        await db.reserva.update(
          { estado: "cancelada" },
          { where: { id: reserva.id } },
        );

        await db.horario.update(
          { disponible: true },
          { where: { id: reserva.horario_id } },
        );
      }

      res.redirect("/mis-reservas");
    } catch (error) {
      console.error(error);
      res.redirect("/mis-reservas");
    }
  });
  app.get("/admin/reservas", isAdmin, async (req, res) => {
    try {
      const todasLasReservas = await db.reserva.findAll({
        include: [
          { model: db.usuario },
          { model: db.horario, include: [{ model: db.cancha }] },
        ],
        order: [["id", "DESC"]],
      });

      res.render("admin/reservas", {
        reservas: todasLasReservas,
      });
    } catch (error) {
      console.error(error);
      res.send("Error al cargar panel de admin");
    }
  });

  app.post("/admin/reservas/estado/:id", isAdmin, async (req, res) => {
    const { nuevo_estado } = req.body;
    try {
      const reserva = await db.reserva.findByPk(req.params.id);
      await db.reserva.update(
        { estado: nuevo_estado },
        { where: { id: req.params.id } },
      );

      if (nuevo_estado === "cancelada") {
        await db.horario.update(
          { disponible: true },
          { where: { id: reserva.horario_id } },
        );
      }
      res.redirect("/admin/reservas");
    } catch (error) {
      res.redirect("/admin/reservas");
    }
  });
};
