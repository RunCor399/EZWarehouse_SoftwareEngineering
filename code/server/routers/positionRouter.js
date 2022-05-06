const { application } = require('express');
const express = require('express')
const router = express.Router();


//POSITION
//GET /api/positions
router.get('/api/positions', (req, res) => {
  let message = {
    message: '/api/positions'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getPositionController().getAllPositions();
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);

});

//POST /api/position
router.post('/api/position', (req, res) => {
  let message = {
    message: '/api/position'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  const positionID = req.body["positionID"];
  const aisleID = req.body["aisleID"];
  const row = req.body["row"];
  const col = req.body["col"];
  const maxWeight = req.body["maxWeight"];
  const maxVolume = req.body["maxVolume"];

  try {
    controller.getPositionController().createPosition(positionID, aisleID, row, col, maxWeight, maxVolume);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


  return res.status(201).json(message);

});

//PUT /api/position/:positionID
router.put('/api/position/:positionID', (req, res) => {
  const param = req.params.positionID;
  let message = {
    message: '/api/position/:positionID'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  const newAisleID = req.body["newAisleID"];
  const newRow = req.body["newRow"];
  const newCol = req.body["newCol"];
  const newMaxWeight = req.body["newMaxWeight"];
  const newMaxVolume = req.body["newMaxVolume"];

  try {
    controller.getPositionController().editPosition(param, newAisleID, newRow, newCol, newMaxWeight, newMaxVolume)
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


  return res.status(200).json(message);

});

//PUT /api/position/:positionID/changeID
router.put('/api/position/:positionID/changeID', (req, res) => {
  const param = req.params.positionID;
  let message = {
    message: '/api/position/:positionID/changeID'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  const newPositionID = req.body["newPositionID"];

  try {
    controller.getPositionController().editPosition(param, newPositionID);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }


  return res.status(200).json(message);

});

//DELETE /api/position/:positionID
router.delete('/api/position/:positionID', (req, res) => {
  const param = req.params.positionID;
  let message = {
    message: '/api/position/:positionID'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getPositionController().deletePosition(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(204).json(message);
});

module.exports = router