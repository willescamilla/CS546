const moviesRoutes = require("./movies");
const reviewsRoutes = require("./reviews");

const constructorMethod = (app) => {
  app.use("/movies", moviesRoutes);
  app.use("/reviews", reviewsRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
