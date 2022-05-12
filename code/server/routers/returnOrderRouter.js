const express = require('express');
const router = express.Router();
const Exceptions = require('./exceptions')
const Controller = require('../modules/logic/controller')

//ReturnOrder Requests
router.get('/api/returnOrders', async (req, res) => {

    /** @type {Controller} */
    const controller = req.app.get("controller");
    console.log('GET',req.url);
    let returnOrders;

    try {
        returnOrders = await controller.getReturnOrderController().getAllReturnOrders();
        console.log("returnOrders", returnOrders);
    } catch (error) {
        let responseParams = Exceptions.handle(error);
        return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(returnOrders);

    /*await controller.getSkuController().getUserAPI()
    .then((user) => { return res.status(200).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });*/
});


router.get('/api/returnOrders/:id', async (req, res) => {
    const param = req.params.id;

    /** @type {Controller} */
    const controller = req.app.get("controller");
    console.log('GET',req.url);
    let returnOrder;

    try {
        returnOrder = await controller.getReturnOrderController().getReturnOrder(param);
        console.log("returnOrder", returnOrder)
    } catch (error) {
        let responseParams = Exceptions.handle(error);
        return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(returnOrder);

    /*await controller.getSkuController().getUserAPI()
    .then((user) => { return res.status(200).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });*/
});



router.post('/api/returnOrder', async (req, res) => {
    
    /** @type {Controller} */
    const controller = req.app.get("controller");
    console.log('POST',req.url);

    try {
        await controller.getReturnOrderController().createReturnOrder(req.body);
    } catch (error) {
        let responseParams = Exceptions.handle(error);
        return res.status(responseParams.code).send(responseParams.message);
    }
    return res.status(200).end();

    /*await controller.getSkuController().getUserAPI()
    .then((user) => { return res.status(200).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });*/
});

router.delete('/api/returnOrder/:id', async (req, res) => {
    const param = req.params.id;
   
    /** @type {Controller} */
    const controller = req.app.get("controller");
    console.log('DELETE',req.url);

    try {
        await controller.getReturnOrderController().deleteReturnOrder(param);
    } catch (error) {
        let responseParams = Exceptions.handle(error);
        return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).end();

    /*await controller.getSkuController().getUserAPI()
    .then((user) => { return res.status(200).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });*/
});



module.exports = router;