const express = require('express');
const router = express.Router();
const warehouseHandlers = require('../controllers/warehouse');
const {isLoggedIn, isAuthorized} = require('../middleware')

router.post('/warehouses',isLoggedIn,isAuthorized, warehouseHandlers.createWarehouse);

router.get('/warehouses',isLoggedIn,isAuthorized, warehouseHandlers.getAllWarehouses);

router.get('/warehouses/:id',isLoggedIn,isAuthorized, warehouseHandlers.getWarehouseById);

router.put('/warehouses/:id',isLoggedIn,isAuthorized, warehouseHandlers.updateWarehouseById);

router.delete('/warehouses/:id',isLoggedIn,isAuthorized, warehouseHandlers.deleteWarehouseById);

module.exports = router;
