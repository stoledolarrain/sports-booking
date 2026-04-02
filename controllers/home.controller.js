module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("home-ejs", {
      userId: req.session.user ? req.session.user.id : null,
      userEmail: req.session.user ? req.session.user.email : null
    });
  });
};