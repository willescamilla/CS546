const express = require("express")
const app = express()
const configRoutes = require('./routes')
const port = 3000

configRoutes(app)

app.listen(port, () => {
  console.log("We've now got a server!")
  console.log('Your routes will be running on http://localhost:3000')
});
