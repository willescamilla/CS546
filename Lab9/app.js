/*
Here is where you'll set up your server as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the array sort page.
*/
const express = require("express")
const app = express()
const static = express.static(__dirname + '/public')
const configRoutes = require('./routes')
const port = 3000

app.use('/public', static)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

configRoutes(app)

app.listen(port, () => {
  console.log("We've now got a server!")
  console.log(`Your routes will be running on http://localhost:${port}`)
})