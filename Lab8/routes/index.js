//Here you will require route files and export them as used in previous labs
const { searchPeople } = require("../data/index");
const searchPeopleRoutes = require("./people");

const constructorMethod = (app) => {
  app.use("/", searchPeopleRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
