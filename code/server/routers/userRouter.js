const express = require('express')
const router = express.Router()
const Exceptions = require('./exceptions')


//USER
//GET /api/userinfo
router.get('/api/userinfo', (req, res) => {

  let user;
  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  try {
    user = controller.getUserController().getUser();
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
  let suppliers
  const controller = req.app.get("controller");
  controller.testPrint(req.url);
  try {
    suppliers = await controller.getUserController().getAllSuppliers();
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(suppliers);
});

//GET /api/users
router.get('/api/users', async (req, res) => {
  let users;

  const controller = req.app.get("controller");
  controller.testPrint(req.url);


  try {
    users = await controller.getUserController().getAllUsers();
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(users);
});

//POST /api/newUser
router.post('/api/newUser', async (req, res) => {
  let message = {
    message: '/api/newUser'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

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
  let message = {
    message: '/api/managerSessions'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);


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
  let message = {
    message: '/api/customerSessions'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

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
  let message = {
    message: '/api/supplierSessions'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    await  controller.getUserController().login(req.body, "supplier")
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//POST /api/clerkSessions
router.post('/api/clerkSessions', async (req, res) => {
  let message = {
    message: '/api/clerkSessions'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

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
  let message = {
    message: '/api/qualityEmployeeSessions'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

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
  let message = {
    message: '/api/deliveryEmployeeSessions'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    await  controller.getUserController().login(req.body, "deliveryEmployee")
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});

//POST /api/logout
router.post('/api/logout', async (req, res) => {
  let message = {
    message: '/api/logout'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);


  try {
    await  controller.getUserController().logout();
  } catch (error) {
    if (error.message === Exceptions.message500)
      return res.status(500).send(Exceptions.message500)
  }

  return res.status(200).json(Exceptions.message);
});



//PUT /api/user/:username
router.put('/api/user/:username', async (req, res) => {
  const param = req.params.username;
  let message = {
    message: '/api/user/:username'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    await  controller.getUserController().editUser(param, req.body);
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
  let message = {
    message: '/api/user/:username/:type'
  }

  const controller = req.app.get("controller");
  controller.testPrint(req.url);

  try {
    await  controller.getUserController().deleteUser(paramUsername, paramType);
  } catch (error) {
    let responseParams = Exceptions.handle(error);
    return res.status(responseParams.code).send(responseParams.message);
  }

  return res.status(200).json(message);
});



module.exports = router