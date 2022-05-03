const express = require('express');
const router = express.Router();

//ReturnOrder Requests

router.route('/api/returnOrders')
    .get((req, res) => {
        let message = {
            message: 'GET Return Orders'
          }
          return res.status(200).json(message);
    });


router.route('/api/returnOrders/:id')
    .get((req, res) => {
        const param = req.params.id;
        let message = {
            message: "GET Return Orders: "+param
        }
        return res.status(200).json(message);
    });
    


router.route('/api/returnOrder')
    .post((req, res) => {
        let message = {
            message: 'POST /api/returnOrder'
          }
          return res.status(200).json(message);
    });

router.route('/api/returnOrder/:id')
    .delete((req, res) => {
        const param = req.params.id;
        let message = {
            message: 'DELETE /api/returnOrder '+ param
          }
          return res.status(200).json(message);
    });
    


module.exports = router;