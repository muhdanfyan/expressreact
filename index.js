//import express
const express = require('express')

//import CORS
const cors = require('cors')

//import bodyParser
const bodyParser = require('body-parser')

//init app
const app = express()

//use cors
app.use(cors())

//use body parser
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//define port
const port = 3000;

//route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})