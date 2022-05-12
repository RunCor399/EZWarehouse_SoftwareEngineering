const express = require('express')
const router = express.Router()
const Controller = require('../modules/logic/controller')

//USER
//GET /api/userinfo
router.get('/api/userinfo', async (req, res) => {


  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  await controller.getSkuController().getUserAPI()
    .then((user) => { return res.status(200).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//GET /api/suppliers
router.get('/api/suppliers', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET',req.url);
  
  await controller.getSkuController().getAllSuppliers()
    .then((suppliers) => { return res.status(200).json(suppliers); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//GET /api/users
router.get('/api/users', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  await controller.getSkuController().getAllUsers()
    .then((users) => { return res.status(200).json(users); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });

});

//POST /api/newUser
router.post('/api/newUser', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST', req.url);

  await controller.getSkuController().createUser(req.body)
    .then(() => { return res.status(201).end() })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//POST /api/managerSessions
router.post('/api/managerSessions', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST', req.url);

  await controller.getSkuController().login(req.body, "manager")
    .then(() => { return res.status(201).end() })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//POST /api/customerSessions
router.post('/api/customerSessions', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST', req.url);

  await controller.getSkuController().login(req.body, "customer")
    .then(() => { return res.status(201).end() })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//POST /api/supplierSessions
router.post('/api/supplierSessions', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  await controller.getSkuController().login(req.body, "supplier")
    .then(() => { return res.status(201).end() })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//POST /api/clerkSessions
router.post('/api/clerkSessions', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  await controller.getSkuController().login(req.body, "clerk")
    .then(() => { return res.status(201).end() })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//POST /api/qualityyEmployeeSessions
router.post('/api/qualityEmployeeSessions', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  await controller.getSkuController().login(req.body, "qualityEmployee")
    .then(() => { return res.status(201).end() })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//POST /api/deliveryEmployeeSessions
router.post('/api/deliveryEmployeeSessions', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  await controller.getSkuController().login(req.body, "deliveryEmployee")
    .then(() => { return res.status(201).end() })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//POST /api/logout
router.post('/api/logout', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  await controller.getSkuController().logout()
    .then(() => { return res.status(200).end() })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});



//PUT /api/user/:username
router.put('/api/user/:username', async (req, res) => {
  const param = req.params.username;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT', req.url);

  await controller.getSkuController().editUser(param, req.body)
    .then(() => { return res.status(200).end() })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//DELETE /api/user/:username/:type
router.delete('/api/user/:username/:type', async (req, res) => {
  const paramUsername = req.params.username;
  const paramType = req.params.type;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('DELETE', req.url);

  await controller.getSkuController().deleteUser(paramUsername, paramType)
    .then(() => { return res.status(200).end() })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});



module.exports = router