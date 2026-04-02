exports.isAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.rol !== "admin") {
      return res.redirect("/");
    }
    next();
  };