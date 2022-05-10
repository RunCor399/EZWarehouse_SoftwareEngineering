const express = require('express');
const router = express.Router();
const Exceptions = require('./exceptions')

//ReturnOrder Requests

router.get('/api/returnOrders', async (req, res) => {
    let message = {
        message: 'GET Return Orders'
    }

    const controller = req.app.get("controller");
    console.log('GET',req.url);

    try {
        await controller.getReturnOrderController().getAllReturnOrders();
    } catch (error) {
        let responseParams = Exceptions.handle(error);
        return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
});


router.get('/api/returnOrders/:id', async (req, res) => {
    const param = req.params.id;
    let message = {
        message: "GET Return Orders: " + param
    }

    const controller = req.app.get("controller");
    console.log('GET',req.url);

    try {
        await controller.getReturnOrderController().getReturnOrder(param);
    } catch (error) {
        let responseParams = Exceptions.handle(error);
        return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
});



router.post('/api/returnOrder', async (req, res) => {
    let message = {
        message: 'POST /api/returnOrder'
    }

    const controller = req.app.get("controller");
    console.log('POST',req.url);

    try {
        await controller.getReturnOrderController().createReturnOrder(req.body);
    } catch (error) {
        let responseParams = Exceptions.handle(error);
        return res.status(responseParams.code).send(responseParams.message);
    }
    return res.status(200).json(message);
});

router.delete('/api/returnOrder/:id', async (req, res) => {
    const param = req.params.id;
    let message = {
        message: 'DELETE /api/returnOrder ' + param
    }

    const controller = req.app.get("controller");
    console.log('DELETE',req.url);

    try {
        await controller.getReturnOrderController().deleteReturnOrder(param);
    } catch (error) {
        let responseParams = Exceptions.handle(error);
        return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
});



module.exports = router;