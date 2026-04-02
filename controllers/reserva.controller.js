const { checkUser } = require("../middlewares/check-users");
const { isAdmin } = require("../middlewares/check-admin");

module.exports = (app, db) => {
  // 1. VISTA CLIENTE: Mostrar canchas y horarios disponibles
  app.get("/reservar", checkUser, async (req, res) => {
    try {
      // Traemos las canchas activas y sus horarios libres
      const canchas = await db.cancha.findAll({
        where: { estado: "activa" },
        include: [
          { model: db.tipoCancha },
          {
            model: db.horario,
            where: { disponible: true }, // ¡Solo mostramos lo que se puede reservar!
            required: false, // Esto permite que la cancha salga aunque no tenga horarios aún
          },
        ],
      });

      res.render("cliente/reservar", {
        canchas: canchas,
        // Usamos res.locals que configuraste maravillosamente en tu middleware
        userId: res.locals.userId,
        userEmail: res.locals.userEmail,
        userRol: res.locals.userRol,
      });
    } catch (error) {
      console.error(error);
      res.send("Ocurrió un error al cargar las reservas.");
    }
  });

  // 2. ACCIÓN: El cliente hace clic en "Reservar"
  app.post("/reservar/:horario_id", checkUser, async (req, res) => {
    const { horario_id } = req.params;
    const usuario_id = res.locals.userId;

    try {
      // a) Creamos la reserva conectando al usuario con el horario
      await db.reserva.create({
        usuario_id: usuario_id,
        horario_id: horario_id,
        estado: "confirmada",
      });

      // b) ¡Súper importante! Cambiamos el horario a ocupado (disponible: false)
      await db.horario.update(
        { disponible: false },
        { where: { id: horario_id } },
      );

      // Lo mandamos a su historial de reservas (lo crearemos en el próximo paso)
      res.redirect("/mis-reservas");
    } catch (error) {
      console.error(error);
      res.send("Hubo un problema al procesar tu reserva.");
    }
  });
  // 3. VISTA CLIENTE: Historial de reservas ("Mis Reservas")
  app.get("/mis-reservas", checkUser, async (req, res) => {
    try {
      // Buscamos solo las reservas de ESTE usuario
      const misReservas = await db.reserva.findAll({
        where: { usuario_id: res.locals.userId },
        include: [
          {
            model: db.horario,
            include: [{ model: db.cancha }], // Traemos los datos de la cancha
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

  // 4. ACCIÓN: Cancelar una reserva
  app.post("/reservas/cancelar/:id", checkUser, async (req, res) => {
    try {
      const reserva = await db.reserva.findOne({
        where: { id: req.params.id },
      });

      if (reserva) {
        // 1. Cambiamos el estado de la reserva a "cancelada"
        await db.reserva.update(
          { estado: "cancelada" },
          { where: { id: reserva.id } },
        );

        // 2. ¡Volvemos a liberar el horario para que otro lo use!
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
  // 5. VISTA ADMIN: Ver TODAS las reservas del sistema
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

  // 6. ACCIÓN ADMIN: Cambiar estado (Confirmar/Cancelar/Completar)
  app.post("/admin/reservas/estado/:id", isAdmin, async (req, res) => {
    const { nuevo_estado } = req.body; // Aquí recibiremos 'completada' o 'cancelada'
    try {
      const reserva = await db.reserva.findByPk(req.params.id);
      await db.reserva.update(
        { estado: nuevo_estado },
        { where: { id: req.params.id } },
      );

      // Si se cancela, liberamos el horario. Si se completa, el horario se queda ocupado (porque ya pasó).
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
