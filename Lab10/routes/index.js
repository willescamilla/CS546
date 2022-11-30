//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.

const apiRoutes = require("./routesAPI");

const constructorMethod = (app) => {
  app.use("/", apiRoutes);
  app.use("/login", apiRoutes);
  app.use("/register", apiRoutes);
  app.use("/protected", apiRoutes);
  app.use("/logout", apiRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
