const express = require('express')
const router = express.Router()
const Exceptions = require('./exceptions')
const Controller = require('../modules/logic/controller')

//USER
//GET /api/userinfo
router.get('/api/userinfo', (req, res) => {


  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);
  let user;

  try {
    user = controller.getUserController().getUser();
    console.log("user", user);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  let message = {
    id: "id",
    username: user.username,
    name: "name",
    surname: "surname",
    type: user.type
  };

  return res.status(200).json(message);
});

//GET /api/suppliers
router.get('/api/suppliers', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  let suppliers;

  try {
    suppliers = await controller.getUserController().getAllSuppliers();
    console.log("suppliers", suppliers);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(suppliers);
});

//GET /api/users
router.get('/api/users', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);
  let users;


  try {
    users = await controller.getUserController().getAllUsers();
    console.log("users", users)
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(users);
});

//POST /api/newUser
router.post('/api/newUser', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST', req.url);

  try {
    await controller.getUserController().createUser(req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(201).json(message);
});

//POST /api/managerSessions
router.post('/api/managerSessions', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST', req.url);


  try {
    await controller.getUserController().login(req.body, "manager");
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//POST /api/customerSessions
router.post('/api/customerSessions', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST', req.url);

  try {
    await controller.getUserController().login(req.body, "customer")
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//POST /api/supplierSessions
router.post('/api/supplierSessions', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  try {
    await controller.getUserController().login(req.body, "supplier")
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//POST /api/clerkSessions
router.post('/api/clerkSessions', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  try {
    await controller.getUserController().login(req.body, "clerk")
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//POST /api/qualityyEmployeeSessions
router.post('/api/qualityEmployeeSessions', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  try {
    await controller.getUserController().login(req.body, "qualityEmployee")
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//POST /api/deliveryEmployeeSessions
router.post('/api/deliveryEmployeeSessions', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  try {
    await controller.getUserController().login(req.body, "deliveryEmployee")
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//POST /api/logout
router.post('/api/logout', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);


  try {
    await controller.getUserController().logout();
  } catch (error) {
    if (error.message === Exceptions.message500)
      return res.status(500).send(Exceptions.message500)
  }

  return res.status(200).json(Exceptions.message);
});



//PUT /api/user/:username
router.put('/api/user/:username', async (req, res) => {
  const param = req.params.username;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT', req.url);

  try {
    await controller.getUserController().editUser(param, req.body);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }
  return res.status(200).json(message);
});

//DELETE /api/user/:username/:type
router.delete('/api/user/:username/:type', async (req, res) => {
  const paramUsername = req.params.username;
  const paramType = req.params.type;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('DELETE', req.url);

  try {
    await controller.getUserController().deleteUser(paramUsername, paramType);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});



module.exports = router