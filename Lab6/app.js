const express = require("express");
const app = express();
const routes = require("./routes");
const defPort = 3000;
app.use(express.json());
routes(app);

app.listen(defPort, () => {
  console.log("Server online!");
  console.log("Routes running on http://localhost:3000");
});
