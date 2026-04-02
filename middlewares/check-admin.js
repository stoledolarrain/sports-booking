exports.isAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.rol !== "admin") {
        return res.redirect("/");
    }
    res.locals.userId = req.session.user.id;
    res.locals.userEmail = req.session.user.email;
    res.locals.userRol = req.session.user.rol;
    res.locals.user = req.session.user;

    next();
};