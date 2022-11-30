const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");
const session = require("express-session");
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthCookie",
    secret: "secret secret secret time",
    saveUninitialized: true,
    resave: false,
  })
);

app.use("/private", (req, res, next) => {
  var date = new Date().toUTCString();
  var authenticated = req.session.user !== null;
  console.log(
    "[" +
      date +
      "]: " +
      req.method +
      " " +
      req.originalUrl +
      " (Authenticated: " +
      authenticated +
      ")"
  );
  if (!req.session.user) {
    res.status(403);
    res.render("pages/login", {
      title: "Login",
      error: "User is not logged in",
    });
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
