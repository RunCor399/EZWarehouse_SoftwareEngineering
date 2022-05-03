'use strict';


const express = require('express');
const Controller = require('./modules/controller')
// init express
const app = new express();
const port = 3001;

//Routers
const restockOrderRouter = require('./routers/restockOrderRouter');
const skusRouter = require('./routers/skusRouter');
const skuItemsRouter = require('./routers/skuItemsRouter');
const positionRouter = require('./routers/positionRouter');
const returnOrderRouter = require('./routers/returnOrderRouter');

//Controller
const controller = new Controller();

app.use(express.json());
app.use('/', restockOrderRouter);
app.use('/', skusRouter);
app.use('/', skuItemsRouter);
app.use('/', positionRouter);
app.use('/', returnOrderRouter);

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