const express = require('express');
const router = express.Router();

//ReturnOrder Requests

router.route('/api/returnOrders')
    .get((req, res) => {
        let message = {
            message: 'GET Return Orders'
        }

        const controller = req.app.get("controller");
        controller.print();

        return res.status(200).json(message);
    });


router.route('/api/returnOrders/:id')
    .get((req, res) => {
        const param = req.params.id;
        let message = {
            message: "GET Return Orders: " + param
        }

        const controller = req.app.get("controller");
        controller.print();

        return res.status(200).json(message);
    });



router.route('/api/returnOrder')
    .post((req, res) => {
        let message = {
            message: 'POST /api/returnOrder'
        }

        const controller = req.app.get("controller");
        controller.print();

        const returnDate = req.body["returnDate"];
        const products = req.body["products"];
        const restockOrderId = req.body["restockOrderId"];

        return res.status(200).json(message);
    });

router.route('/api/returnOrder/:id')
    .delete((req, res) => {
        const param = req.params.id;
        let message = {
            message: 'DELETE /api/returnOrder ' + param
        }

        const controller = req.app.get("controller");
        controller.print();
        
        return res.status(200).json(message);
    });



module.exports = router;