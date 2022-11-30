// Setup server, session and middleware here.
const express = require("express");
const app = express();
const configRoutes = require("./routes");
const static = express.static(__dirname + "/public");
const session = require("express-session");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthCookie",
    secret: "my secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

const myLogger = (req, res, next) => {
  var date = new Date().toUTCString();
  var authenticated;
  try {
    if (req.session.user.username !== undefined) {
      authenticated = true;
    }
  } catch (e) {
    authenticated = false;
  }
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
  next();
};

app.use(myLogger);

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
