const express = require('express')
const router = express.Router()


//TEST DESCRIPTOR
//GET /api/testDescriptors
router.get('/api/testDescriptors', (req,res)=>{
    let message = {
      message: '/api/testDescriptors'
    }

    const controller = req.app.get("controller");
    controller.print();

    return res.status(200).json(message);
  });
  
  //GET /api/testDescriptors/:id
  router.get('/api/testDescriptors/:id', (req,res)=>{
    const param = req.params.id;
    let message = {
      message: '/api/testDescriptors/:id'
    }

    const controller = req.app.get("controller");
    controller.print();

    return res.status(200).json(message);
  });
  
  //POST /api/testDescriptor
  router.post('/api/testDescriptor', (req,res)=>{
    let message = {
      message: '/api/testDescriptor'
    }
    const controller = req.app.get("controller");
    controller.print();

    const name = req.body["name"];
    const procedureDescription = req.body["procedureDescription"];
    const idSKU = req.body["idSKU"];

    return res.status(200).json(message);
  });
  
  //PUT /api/testDescriptor/:id
  router.put('/api/testDescriptor/:id', (req,res)=>{
    const param = req.params.id;
    let message = {
      message: '/api/testDescriptor/:id'
    }

    const controller = req.app.get("controller");
    controller.print();
    
    const newName = req.body["newName"];
    const newProcedureDescription = req.body["newProcedureDescription"];
    const newIdSKU = req.body["newIdSKU"];


    return res.status(200).json(message);
  });
  
  //DELETE /api/testDescriptor/:id
  router.delete('/api/testDescriptor/:id', (req,res)=>{
    const param = req.params.id;
    let message = {
      message: '/api/testDescriptor/:id'
    }

    const controller = req.app.get("controller");
    controller.print();

    return res.status(200).json(message);
  });





  
  //TEST RESULT
  //GET /api/skuitems/:rfid/testResults
  router.get('/api/skuitems/:rfid/testResults', (req,res)=>{
    let message = {
      message: '/api/skuitems/:rfid/testResults'
    }

    const controller = req.app.get("controller");
    controller.print();

    return res.status(200).json(message);
  });
  
  //GET /api/skuitems/:rfid/testResults/:id
  router.get('/api/skuitems/:rfid/testResults/:id', (req,res)=>{
    let message = {
      message: '/api/skuitems/:rfid/testResults/:id'
    }

    const controller = req.app.get("controller");
    controller.print();

    return res.status(200).json(message);
  });
  
  //POST /api/skuitems/testResult
  router.post('/api/skuitems/testResult', (req,res)=>{
    let message = {
      message: '/api/skuitems/testResult'
    }

    const controller = req.app.get("controller");
    controller.print();

    const rfid = req.body["rfid"];
    const idTestDesciptor = req.body["idTestDescriptor"];
    const Date = req.body["Date"];
    const Result = req.body["Result"];

    return res.status(200).json(message);
  });
  
  //PUT /api/skuitems/:rfid/testResult/:id
  router.put('/api/skuitems/:rfid/testResult/:id', (req,res)=>{
    let message = {
      message: '/api/skuitems/:rfid/testResult/:id'
    }

    const controller = req.app.get("controller");
    controller.print();

    const newIdTestDesciptor = req.body["newIdTestDescriptor"];
    const newDate = req.body["newDate"];
    const newResult = req.body["newResult"];

    return res.status(200).json(message);
  });
  
  //DELETE /api/skuitems/:rfid/testResult/:id
  router.delete('/api/skuitems/:rfid/testResult/:id', (req,res)=>{
    let message = {
      message: '/api/skuitems/:rfid/testResult/:id'
    }

    const controller = req.app.get("controller");
    controller.print();
    
    return res.status(200).json(message);
  });


module.exports = router