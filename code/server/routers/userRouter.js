const express = require('express')
const router = express.Router()
 

//USER
//GET /api/userinfo
router.get('/api/userinfo', (req,res)=>{
    let message = {
      message: '/api/userinfo'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
  controller.getUserController().getUser();

    return res.status(200).json(message);
  });
  
  //GET /api/suppliers
  router.get('/api/suppliers', (req,res)=>{
    let message = {
      message: '/api/suppliers'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
    controller.getUserController().getAllSuppliers();

    return res.status(200).json(message);
  });

    //GET /api/users
    router.get('/api/users', (req,res)=>{
        let message = {
          message: '/api/users'
        }

        const controller = req.app.get("controller");
        controller.testPrint(req.url);
      controller.getUserController().getAllUsers();
      
        return res.status(200).json(message);
      });
  
  //POST /api/newUser
  router.post('/api/newUser', (req,res)=>{
    let message = {
      message: '/api/newUser'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
    
    const username = req.body["username"];
    const name = req.body["name"];
    const surname = req.body["surname"];
    const password = req.body["password"];
    const type = req.body["type"];
    
    controller.getUserController().createUser(username, name,
    surname, password, type);

    return res.status(200).json(message);
  });
  
 //POST /api/managerSessions
 router.post('/api/managerSessions', (req,res)=>{
    let message = {
      message: '/api/managerSessions'
    }

    const controller = req.app.get("controller");
   controller.testPrint(req.url);
   
   const username = req.body["username"];
   const password = req.body["password"];

   controller.getUserController().loginManager(username, password);
   
    return res.status(200).json(message);
  });
  
   //POST /api/customerSessions
   router.post('/api/customerSessions', (req,res)=>{
    let message = {
      message: '/api/customerSessions'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
   
    const username = req.body["username"];
    const password = req.body["password"];
 
    controller.getUserController().loginCustomer(username, password);
    return res.status(200).json(message);
  });

   //POST /api/supplierSessions
   router.post('/api/supplierSessions', (req,res)=>{
    let message = {
      message: '/api/supplierSessions'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
   
    const username = req.body["username"];
    const password = req.body["password"];
 
    controller.getUserController().loginSupplier(username, password);
    return res.status(200).json(message);
  });

   //POST /api/clerkSessions
   router.post('/api/clerkSessions', (req,res)=>{
    let message = {
      message: '/api/clerkSessions'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
   
    const username = req.body["username"];
    const password = req.body["password"];
 
    controller.getUserController().loginClerk(username, password);
    return res.status(200).json(message);
  });

   //POST /api/qualityyEmployeeSessions
   router.post('/api/qualityEmployeeSessions', (req,res)=>{
    let message = {
      message: '/api/qualityEmployeeSessions'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
   
    const username = req.body["username"];
    const password = req.body["password"];
 
    controller.getUserController().loginQualityEmployee(username, password);
    return res.status(200).json(message);
  });

   //POST /api/deliveryEmployeeSessions
   router.post('/api/deliveryEmployeeSessions', (req,res)=>{
    let message = {
      message: '/api/deliveryEmployeeSessions'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
   
    const username = req.body["username"];
    const password = req.body["password"];
 
    controller.getUserController().loginDeliveryEmployee(username, password);
    return res.status(200).json(message);
  });

   //POST /api/logout
   router.post('/api/logout', (req,res)=>{
    let message = {
      message: '/api/logout'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
     controller.getUserController().logout();
     
    return res.status(200).json(message);
  });
  


  //PUT /api/user/:username
  router.put('/api/user/:username', (req,res)=>{
    const param = req.params.username;
    let message = {
      message: '/api/user/:username'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
    
    const oldType = req.body["oldType"];
    const newType = req.body["newType"];
    
    controller.getUserController().editUser(param, oldType, newType);

    return res.status(200).json(message);
  });
  
  //DELETE /api/user/:username/:type
  router.delete('/api/user/:username/:type', (req,res)=>{
    const paramUsername = req.params.username;
    const paramType = req.params.type;
    let message = {
      message: '/api/user/:username/:type'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);
    controller.getUserController().deleteUser(paramUsername, paramType);
    
    return res.status(200).json(message);
  });



module.exports = router