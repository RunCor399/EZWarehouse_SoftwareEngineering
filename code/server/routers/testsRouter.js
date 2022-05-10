const express = require('express')
const router = express.Router()
const Exceptions = require('./exceptions')


//TEST DESCRIPTOR
//GET /api/testDescriptors
router.get('/api/testDescriptors', async (req, res) => {
  let message = {
    message: '/api/testDescriptors'
  }

  const controller = req.app.get("controller");
  console.log('GET',req.url);

  try {
    await controller.getTestDescriptorController().getAllTestDescriptors();
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//GET /api/testDescriptors/:id
router.get('/api/testDescriptors/:id', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/testDescriptors/:id'
  }

  const controller = req.app.get("controller");
  console.log('GET',req.url);

  try {
    await controller.getTestDescriptorController().getTestDescriptor(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//POST /api/testDescriptor
router.post('/api/testDescriptor', async (req, res) => {
  let message = {
    message: '/api/testDescriptor'
  }
  const controller = req.app.get("controller");
  console.log('POST',req.url);


  try {
    await controller.getTestDescriptorController().createTestDescriptor(req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(201).json(message);
});

//PUT /api/testDescriptor/:id
router.put('/api/testDescriptor/:id', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/testDescriptor/:id'
  }

  const controller = req.app.get("controller");
  console.log('PUT',req.url);

  try {
    await controller.getTestDescriptorController().editTestDescriptor(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//DELETE /api/testDescriptor/:id
router.delete('/api/testDescriptor/:id', async (req, res) => {
  const param = req.params.id;
  let message = {
    message: '/api/testDescriptor/:id'
  }

  const controller = req.app.get("controller");
  console.log('DELETE',req.url);

  try {
    await controller.getTestDescriptorController().deleteTestDescriptor(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  return res.status(204).json(message);
});






//TEST RESULT
//GET /api/skuitems/:rfid/testResults
router.get('/api/skuitems/:rfid/testResults', async (req, res) => {
  const param = req.params.rfid;
  let message = {
    message: '/api/skuitems/:rfid/testResults'
  }

  const controller = req.app.get("controller");
  console.log('GET',req.url);

  try {
    await controller.getTestResultController().getTestResults(param);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//GET /api/skuitems/:rfid/testResults/:id
router.get('/api/skuitems/:rfid/testResults/:id', async (req, res) => {
  const paramRfid = req.params.rfid;
  const paramId = req.params.id;
  let message = {
    message: '/api/skuitems/:rfid/testResults/:id'
  }

  const controller = req.app.get("controller");
  console.log('GET',req.url);

  try {
    await controller.getTestResultController().getTestResult(paramRfid, paramId);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//POST /api/skuitems/testResult
router.post('/api/skuitems/testResult', async (req, res) => {
  let message = {
    message: '/api/skuitems/testResult'
  }

  const controller = req.app.get("controller");
  console.log('POST',req.url);

  try {
    await controller.getTestResultController().createTestResult(req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  return res.status(200).json(message);
});

//PUT /api/skuitems/:rfid/testResult/:id
router.put('/api/skuitems/:rfid/testResult/:id', async (req, res) => {
  const paramRfid = req.params.rfid;
  const paramId = req.params.id;
  let message = {
    message: '/api/skuitems/:rfid/testResult/:id'
  }

  const controller = req.app.get("controller");
  console.log('PUT',req.url);

  try {
    await controller.getTestResultController().editTestResult(paramRfid, paramId, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  return res.status(200).json(message);
});

//DELETE /api/skuitems/:rfid/testResult/:id
router.delete('/api/skuitems/:rfid/testResult/:id', async (req, res) => {
  const paramRfid = req.params.rfid;
  const paramId = req.params.id;
  let message = {
    message: '/api/skuitems/:rfid/testResult/:id'
  }

  const controller = req.app.get("controller");
  console.log('DELETE',req.url);

  try {
    await controller.getTestResultController().deleteTestResult(paramRfid, paramId);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  return res.status(200).json(message);
});


module.exports = router