const express = require('express');
const router = express.Router();

//ReturnOrder Requests

router.route('/api/returnOrders').get(async (req, res) => {
    let message = {
        message: 'GET Return Orders'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
        await controller.getReturnOrderController().getAllReturnOrders();
    } catch (error) {
        let responseParams = Exceptions.handle(error);
        return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
});


router.route('/api/returnOrders/:id').get(async (req, res) => {
    const param = req.params.id;
    let message = {
        message: "GET Return Orders: " + param
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
        await controller.getReturnOrderController().getReturnOrder(param);
    } catch (error) {
        let responseParams = Exceptions.handle(error);
        return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
});



router.route('/api/returnOrder').post(async (req, res) => {
    let message = {
        message: 'POST /api/returnOrder'
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
        await controller.getReturnOrderController().createReturnOrder(req.body);
    } catch (error) {
        let responseParams = Exceptions.handle(error);
        return res.status(responseParams.code).send(responseParams.message);
    }
    return res.status(200).json(message);
});

router.route('/api/returnOrder/:id').delete(async (req, res) => {
    const param = req.params.id;
    let message = {
        message: 'DELETE /api/returnOrder ' + param
    }

    const controller = req.app.get("controller");
    controller.testPrint(req.url);

    try {
        await controller.getReturnOrderController().deleteReturnOrder(param);
    } catch (error) {
        let responseParams = Exceptions.handle(error);
        return res.status(responseParams.code).send(responseParams.message);
    }

    return res.status(200).json(message);
});



module.exports = router;