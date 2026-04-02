exports.isAdmin = (req, res, next) => {
    // 1. Verificamos si hay sesión y si es admin
    if (!req.session.user || req.session.user.rol !== "admin") {
        return res.redirect("/");
    }

    // 2. ¡AQUÍ ESTÁ EL TRUCO! 
    // Guardamos los datos en res.locals para que el HEADER los vea automáticamente
    res.locals.userId = req.session.user.id;
    res.locals.userEmail = req.session.user.email;
    res.locals.userRol = req.session.user.rol;
    res.locals.user = req.session.user; // Por si acaso el header busca el objeto completo

    next();
};