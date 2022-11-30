//require express, express router and bcrypt as shown in lecture code
const express = require("express");
const router = express.Router();
const { createUser, checkUser } = require("../data/users");

router.route("/").get(async (req, res) => {
  if (req.session.user) {
    res.redirect("/protected");
  } else {
    res.render("userLogin");
  }
});

router
  .route("/register")
  .get(async (req, res) => {
    if (req.session.user) {
      res.redirect("/protected");
    } else {
      res.render("userRegister");
    }
  })
  .post(async (req, res) => {
    const { usernameInput, passwordInput } = req.body;
    try {
      const { insertedUser } = await createUser(usernameInput, passwordInput);
      if (insertedUser) {
        res.redirect("/");
      } else {
        res.render("userRegister", {
          error: "Internal Server Error",
          status: 500,
        });
      }
    } catch (e) {
      res.render("userRegister", {
        error: e,
        status: 400,
      });
    }
  });

router.route("/login").post(async (req, res) => {
  const { usernameInput, passwordInput } = req.body;
  try {
    const { authenticatedUser } = await checkUser(usernameInput, passwordInput);
    if (authenticatedUser) {
      req.session.user = { username: usernameInput.toLowerCase() };
      res.redirect("/protected");
    } else {
      res.status(400);
    }
  } catch (e) {
    res.render("userLogin", {
      error: e,
      status: 400,
    });
  }
});

router.route("/protected").get(async (req, res) => {
  var date = new Date().toUTCString();
  if (!req.session.user) {
    res.render("forbiddenAccess", {
      status: 403,
    });
  } else {
    res.render("private", {
      username: req.session.user.username,
      date: date,
    });
  }
});

router.route("/logout").get(async (req, res) => {
  req.session.destroy();
  res.render("logout");
});

module.exports = router;
