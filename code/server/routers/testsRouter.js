const express = require('express')
const router = express.Router()
const Exceptions = require('./exceptions')


//TEST DESCRIPTOR
//GET /api/testDescriptors
router.get('/api/testDescriptors', (req, res) => {
  let message = {
    message: '/api/testDescriptors'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getTestController().getAllTestDescriptors();
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//GET /api/testDescriptors/:id
router.get('/api/testDescriptors/:id', (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/testDescriptors/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getTestController().getTestDescriptor(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//POST /api/testDescriptor
router.post('/api/testDescriptor', (req, res) => {
  let message = {
    message: '/api/testDescriptor'
  }
  const controller = req.app.get("controller");
  controller.testPrint(req.url);


  try {
    controller.getTestController().createTestDescriptor(req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(201).json(message);
});

//PUT /api/testDescriptor/:id
router.put('/api/testDescriptor/:id', (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/testDescriptor/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);
 
  try {
    controller.getTestController().editTestDescriptor(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//DELETE /api/testDescriptor/:id
router.delete('/api/testDescriptor/:id', (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/testDescriptor/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getTestController().deleteTestDescriptor(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  return res.status(204).json(message);
});






//TEST RESULT
//GET /api/skuitems/:rfid/testResults
router.get('/api/skuitems/:rfid/testResults', (req, res) => {
  const param = req.params.rfid;
  let message = {
    message: '/api/skuitems/:rfid/testResults'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getTestController().getTestResults(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//GET /api/skuitems/:rfid/testResults/:id
router.get('/api/skuitems/:rfid/testResults/:id', (req, res) => {
  const paramRfid = req.params.rfid;
  const paramId = req.params.id;
  let message = {
    message: '/api/skuitems/:rfid/testResults/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getTestController().getTestResult(paramRfid, paramId);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//POST /api/skuitems/testResult
router.post('/api/skuitems/testResult', (req, res) => {
  let message = {
    message: '/api/skuitems/testResult'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getTestController().createTestResult(req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  return res.status(200).json(message);
});

//PUT /api/skuitems/:rfid/testResult/:id
router.put('/api/skuitems/:rfid/testResult/:id', (req, res) => {
  const paramRfid = req.params.rfid;
  const paramId = req.params.id;
  let message = {
    message: '/api/skuitems/:rfid/testResult/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  
  try {
    controller.getTestController().editTestResult(paramRfid, paramId, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  return res.status(200).json(message);
});

//DELETE /api/skuitems/:rfid/testResult/:id
router.delete('/api/skuitems/:rfid/testResult/:id', (req, res) => {
  const paramRfid = req.params.rfid;
  const paramId = req.params.id;
  let message = {
    message: '/api/skuitems/:rfid/testResult/:id'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getTestController().deleteTestResult(paramRfid, paramId);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  return res.status(200).json(message);
});


module.exports = router