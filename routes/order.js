const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const {isLoggedIn, isAuthorized} = require('../middleware')

router.post('/order',isLoggedIn, orderController.createOrder);
router.get('/order',isLoggedIn, orderController.getAllOrders);
router.get('/order/:id',isLoggedIn, orderController.getOrderById);
router.patch('/order/:id',isLoggedIn, orderController.updateOrderById);
router.delete('/order/:id',isLoggedIn, orderController.deleteOrderById);
router.patch('/admin/order/:id',isLoggedIn,isAuthorized, orderController.approveOrRejectOrder);


module.exports = router;
