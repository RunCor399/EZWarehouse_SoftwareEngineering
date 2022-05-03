const express = require('express')
const router = express.Router()


//USER
//GET /api/userinfo
router.get('/api/userinfo', (req,res)=>{
    let message = {
      message: '/api/userinfo'
    }


    return res.status(200).json(message);
  });
  
  //GET /api/suppliers
  router.get('/api/suppliers', (req,res)=>{
    let message = {
      message: '/api/suppliers'
    }
    return res.status(200).json(message);
  });

    //GET /api/users
    router.get('/api/users', (req,res)=>{
        let message = {
          message: '/api/users'
        }
        return res.status(200).json(message);
      });
  
  //POST /api/newUser
  router.post('/api/newUser', (req,res)=>{
    let message = {
      message: '/api/newUser'
    }

    const username = req.body["username"];
    const name = req.body["name"];
    const surname = req.body["surname"];
    const password = req.body["password"];
    const type = req.body["type"];

    return res.status(200).json(message);
  });
  
 //POST /api/managerSessions
 router.post('/api/managerSessions', (req,res)=>{
    let message = {
      message: '/api/managerSessions'
    }
    return res.status(200).json(message);
  });
  
   //POST /api/customerSessions
   router.post('/api/customerSessions', (req,res)=>{
    let message = {
      message: '/api/customerSessions'
    }
    return res.status(200).json(message);
  });

   //POST /api/supplierSessions
   router.post('/api/supplierSessions', (req,res)=>{
    let message = {
      message: '/api/supplierSessions'
    }
    return res.status(200).json(message);
  });

   //POST /api/clerkSessions
   router.post('/api/clerkSessions', (req,res)=>{
    let message = {
      message: '/api/clerkSessions'
    }
    return res.status(200).json(message);
  });

   //POST /api/qualityyEmployeeSessions
   router.post('/api/qualityEmployeeSessions', (req,res)=>{
    let message = {
      message: '/api/qualityEmployeeSessions'
    }
    return res.status(200).json(message);
  });

   //POST /api/deliveryEmployeeSessions
   router.post('/api/deliveryEmployeeSessions', (req,res)=>{
    let message = {
      message: '/api/deliveryEmployeeSessions'
    }
    return res.status(200).json(message);
  });

   //POST /api/logout
   router.post('/api/logout', (req,res)=>{
    let message = {
      message: '/api/logout'
    }
    return res.status(200).json(message);
  });
  


  //PUT /api/user/:username
  router.put('/api/user/:username', (req,res)=>{
    const param = req.params.username;
    let message = {
      message: '/api/user/:username'
    }

    const oldType = req.body["oldType"];
    const newType = req.body["newType"];

    return res.status(200).json(message);
  });
  
  //DELETE /api/user/:username/:type
  router.delete('/api/user/:username/:type', (req,res)=>{
    const paramUsername = req.params.username;
    const paramType = req.params.type;
    let message = {
      message: '/api/user/:username/:type'
    }
    return res.status(200).json(message);
  });



module.exports = router