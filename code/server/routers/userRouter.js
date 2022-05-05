const MD5 = require("crypto-js/md5")
const express = require('express')
const router = express.Router()
const Exceptions = require('./exceptions')


//USER
//GET /api/userinfo
router.get('/api/userinfo', (req, res) => {


  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  try {
    const session = controller.getUserController().getUser();
  } catch (error) {
    if (error.message === Exceptions.message401)
      return res.status(401).send(Exceptions.message401);
    else if (error.message === Exceptions.message500)
      return res.status(500).send(Exceptions.message500)
  }

  let message = {
    id: "id",
    username: session.username,
    name: "name",
    surname: "surname",
    type: session.type
  };

  return res.status(200).json(message);
});

//GET /api/suppliers
router.get('/api/suppliers', (req, res) => {

  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  try {
    const supplier = controller.getUserController().getAllSuppliers();
  } catch (error) {
    if (error.message === Exceptions.message401)
      return res.status(401).send(Exceptions.message401);
    else if (error.message === Exceptions.message500)
      return res.status(500).send(Exceptions.message500)
  }

  let message = {
    id: "id",
    username: supplier.username,
    name: "name",
    surname: "surname",
    type: supplier.type
  };

  return res.status(200).json(message);
});

//GET /api/users
router.get('/api/users', (req, res) => {
  let message = {
    message: '/api/users'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);


  try {
    controller.getUserController().getAllUsers();
  } catch (error) {
    if (error.message === Exceptions.message401)
      return res.status(401).send(Exceptions.message401);
    else if (error.message === Exceptions.message500)
      return res.status(500).send(Exceptions.message500)
  }

  return res.status(200).json(message);
});

//POST /api/newUser
router.post('/api/newUser', (req, res) => {
  let message = {
    message: '/api/newUser'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  const username = req.body["username"];
  const name = req.body["name"];
  const surname = req.body["surname"];
  const password = MD5(req.body["password"]).toString();

  const type = req.body["type"];

  try {
    controller.getUserController().createUser(username, name,
      surname, password, type);
  } catch (error) {
    if (error.message === Exceptions.message401)
      return res.status(401).send(Exceptions.message401);

    else if (error.message === Exceptions.message409)
      return res.status(409).send(Exceptions.message409)

    else if (error.message === Exceptions.message422)
      return res.status(422).send(Exceptions.message409)

    else if (error.message === Exceptions.message503)
      return res.status(503).send(Exceptions.message503)
  }

  return res.status(201).json(message);
});

//POST /api/managerSessions
router.post('/api/managerSessions', (req, res) => {
  let message = {
    message: '/api/managerSessions'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  const username = req.body["username"];
  const password = MD5(req.body["password"]).toString();

  try {
    controller.getUserController().loginManager(username, password);
  } catch (error) {
    if (error.message === Exceptions.message401)
      return res.status(401).send(Exceptions.message401);

    else if (error.message === Exceptions.message500)
      return res.status(500).send(Exceptions.message500)
  }

  return res.status(200).json(message);
});

//POST /api/customerSessions
router.post('/api/customerSessions', (req, res) => {
  let message = {
    message: '/api/customerSessions'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  const username = req.body["username"];
  const password = MD5(req.body["password"]).toString();



  try {
    controller.getUserController().loginCustomer(username, password);
  } catch (error) {
    if (error.message === Exceptions.message401)
      return res.status(401).send(Exceptions.message401);

    else if (error.message === Exceptions.message500)
      return res.status(500).send(Exceptions.message500)
  }
  return res.status(200).json(message);
});

//POST /api/supplierSessions
router.post('/api/supplierSessions', (req, res) => {
  let message = {
    message: '/api/supplierSessions'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  const username = req.body["username"];
  const password = MD5(req.body["password"]).toString();


  try {
    controller.getUserController().loginSupplier(username, password);
  } catch (error) {
    if (error.message === Exceptions.message401)
      return res.status(401).send(Exceptions.message401);

    else if (error.message === Exceptions.message500)
      return res.status(500).send(Exceptions.message500)
  }

  return res.status(200).json(message);
});

//POST /api/clerkSessions
router.post('/api/clerkSessions', (req, res) => {
  let message = {
    message: '/api/clerkSessions'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  const username = req.body["username"];
  const password = MD5(req.body["password"]).toString();


  try {
    controller.getUserController().loginClerk(username, password);
  } catch (error) {
    if (error.message === Exceptions.message401)
      return res.status(401).send(Exceptions.message401);

    else if (error.message === Exceptions.message500)
      return res.status(500).send(Exceptions.message500)
  }

  return res.status(200).json(message);
});

//POST /api/qualityyEmployeeSessions
router.post('/api/qualityEmployeeSessions', (req, res) => {
  let message = {
    message: '/api/qualityEmployeeSessions'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  const username = req.body["username"];
  const password = MD5(req.body["password"]).toString();


  try {
    controller.getUserController().loginQualityEmployee(username, password);
  } catch (error) {
    if (error.message === Exceptions.message401)
      return res.status(401).send(Exceptions.message401);

    else if (error.message === Exceptions.message500)
      return res.status(500).send(Exceptions.message500)
  }

  return res.status(200).json(message);
});

//POST /api/deliveryEmployeeSessions
router.post('/api/deliveryEmployeeSessions', (req, res) => {
  let message = {
    message: '/api/deliveryEmployeeSessions'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  const username = req.body["username"];
  const password = MD5(req.body["password"]).toString();


  try {
    controller.getUserController().loginDeliveryEmployee(username, password);
  } catch (error) {
    if (error.message === Exceptions.message401)
      return res.status(401).send(Exceptions.message401);

    else if (error.message === Exceptions.message500)
      return res.status(500).send(Exceptions.message500)
  }

  return res.status(200).json(message);
});

//POST /api/logout
router.post('/api/logout', (req, res) => {
  let message = {
    message: '/api/logout'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);


  try {
    controller.getUserController().logout();
  } catch (error) {
    if (error.message === Exceptions.message500)
      return res.status(500).send(Exceptions.message500)
  }

  return res.status(200).json(Exceptions.message);
});



//PUT /api/user/:username
router.put('/api/user/:username', (req, res) => {
  const param = req.params.username;
  let message = {
    message: '/api/user/:username'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  const oldType = req.body["oldType"];
  const newType = req.body["newType"];



  try {
    controller.getUserController().editUser(param, oldType, newType);
  } catch (error) {
    if (error.message === Exceptions.message401)
      return res.status(401).send(Exceptions.message401);

    else if (error.message === Exceptions.message404)
      return res.status(404).send(Exceptions.message404);

    else if (error.message === Exceptions.message422)
      return res.status(422).send(Exceptions.message422);

    else if (error.message === Exceptions.message503)
      return res.status(503).send(Exceptions.message503)
  }
  return res.status(200).json(message);
});

//DELETE /api/user/:username/:type
router.delete('/api/user/:username/:type', (req, res) => {
  const paramUsername = req.params.username;
  const paramType = req.params.type;
  let message = {
    message: '/api/user/:username/:type'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    controller.getUserController().deleteUser(paramUsername, paramType);
  } catch (error) {
    if (error.message === Exceptions.message401)
      return res.status(401).send(Exceptions.message401);

    else if (error.message === Exceptions.message422)
      return res.status(422).send(Exceptions.message422);

    else if (error.message === Exceptions.message503)
      return res.status(503).send(Exceptions.message503)
  }

  return res.status(200).json(message);
});



module.exports = router