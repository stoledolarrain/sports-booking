exports.checkUser = (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/login");
        return;
    }
    console.log("Usuario logueado:", req.session.user);
    res.locals.userEmail = req.session.user.email;
    res.locals.userId = req.session.user.id;
    next();
}