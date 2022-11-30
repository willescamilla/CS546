const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const { ObjectId } = require('mongodb');

router.get("/", async (req, res) => {
  var date = new Date().toUTCString();
  var authenticated = req.session.user!==null;
  console.log("["+date+"]: "+req.method+" "+req.originalUrl+" (Authenticated: "+authenticated+")");
  if (req.session.user){
    res.redirect("/private");
  }
  else {
    res.render("pages/login", {title: "Login"});
  }
});

router.get("/signup", async (req, res) => {
  var date = new Date().toUTCString();
  var authenticated = req.session.user!==null;
  console.log("["+date+"]: "+req.method+" "+req.originalUrl+" (Authenticated: "+authenticated+")");
  if (req.session.user){
    res.redirect("/private");
  }
  else {
    res.render("pages/signup", {title: "Signup"});
  }
});

router.post("/signup", async (req, res) => {
  var date = new Date().toUTCString();
  var authenticated = req.session.user!==null;
  console.log("["+date+"]: "+req.method+" "+req.originalUrl+" (Authenticated: "+authenticated+")");
  const signupData = req.body;
  if (!signupData.username || !signupData.password){
    res.status(400);
    res.render("pages/signup", {title: "Signup", error: "All fields need to be valid values"});
  }
  if (typeof signupData.username !== 'string' || typeof signupData.password !== 'string'){
    res.status(400);
    res.render("pages/signup", {title: "Signup", error: "Both username and password have to be strings"});
  }
  if (signupData.username.includes(" ")){
    res.status(400);
    res.render("pages/signup", {title: "Signup", error: "Username cannot have spaces in it"});
  }
  var new_username = signupData.username.replace(/[^a-z0-9]/gi,'');
  if (new_username!==signupData.username){
    res.status(400);
    res.render("pages/signup", {title: "Signup", error: "Username must contain only alpanumeric characters"});
  }
  if (signupData.username.length<4){
    res.status(400);
    res.render("pages/signup", {title: "Signup", error: "Username must be at least 4 characters long"});
  }
  var username = signupData.username.toLowerCase();
  if (signupData.password.includes(" ")){
    res.status(400);
    res.render("pages/signup", {title: "Signup", error: "Password cannot have spaces in it"});
  }
  if (signupData.password.length<6){
    res.status(400);
    res.render("pages/signup", {title: "Signup", error: "Password must be at least 6 characters long"});
  }
  var password = signupData.password;

  try{
    const response = await userData.createUser(username, password);
    // console.log(response);
    if (response["userInserted"]){
      res.redirect("/");
    }
    else {
      res.status(500);
      res.render("pages/signup", {title: "Signup", error: "Internal Server Error"});  
    }
  }
  catch (e){
    res.status(400);
    res.render('pages/signup', {title: "Signup", error: e});
  }
});

router.post("/login", async (req, res) => {
  var date = new Date().toUTCString();
  var authenticated = req.session.user!==null;
  console.log("["+date+"]: "+req.method+" "+req.originalUrl+" (Authenticated: "+authenticated+")");
  const loginData = req.body;
  if (!loginData.username || !loginData.password){
    res.status(400);
    res.render("pages/login", {title: "Login", error: "All fields need to be valid values"});
  }
  if (typeof loginData.username !== 'string' || typeof loginData.password !== 'string'){
    res.status(400);
    res.render("pages/login", {title: "Login", error: "Both username and password have to be strings"});
  }
  if (loginData.username.includes(" ")){
    res.status(400);
    res.render("pages/login", {title: "Login", error: "Username cannot have spaces in it"});
  }
  var new_username = loginData.username.replace(/[^a-z0-9]/gi,'');
  if (new_username!==loginData.username){
    res.status(400);
    res.render("pages/login", {title: "Login", error: "Username must contain only alpanumeric characters"});
  }
  if (loginData.username.length<4){
    res.status(400);
    res.render("pages/login", {title: "Login", error: "Username must be at least 4 characters long"});
  }
  var username = loginData.username.toLowerCase();
  if (loginData.password.includes(" ")){
    res.status(400);
    res.render("pages/login", {title: "Login", error: "Password cannot have spaces in it"});
  }
  if (loginData.password.length<6){
    res.status(400);
    res.render("pages/login", {title: "Login", error: "Password must be at least 6 characters long"});
  }
  var password = loginData.password;

  try{
    const response = await userData.checkUser(username, password);
    // console.log(response);
    if (response["authenticated"]){
      req.session.user = username;
      res.redirect('/private');
    }
    else {
      res.status(400);
      res.render("pages/login", {title: "Login", error: "Either the username or password is invalid"});  
    }
  }
  catch (e){
    res.status(400);
    res.render('pages/login', {title: "Login", error: e});
  }
});

router.get("/private", async (req, res) => {
  res.render('pages/private', {title: "Your Page", username: req.session.user});
});

router.get("/logout", async (req, res) => {
  var date = new Date().toUTCString();
  var authenticated = req.session.user!==null;
  console.log("["+date+"]: "+req.method+" "+req.originalUrl+" (Authenticated: "+authenticated+")");
  req.session.destroy();
  res.send('Logged out<br><a href="/">/</a>');
});

module.exports = router;