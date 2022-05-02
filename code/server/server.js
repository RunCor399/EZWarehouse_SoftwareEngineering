'use strict';
const express = require('express');
// init express
const app = new express();
const port = 3001;

//Routers
const restockOrderRouter = require('./routers/restockOrderRouter');

app.use(express.json());
app.use('/', restockOrderRouter);

//GET /api/test
app.get('/api/hello', (req,res)=>{
  let message = {
    message: 'Hello World!'
  }
  return res.status(200).json(message);
});


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;