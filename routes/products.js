const express = require('express');
const router = express.Router();
const productHandlers = require('../controllers/products');
const {isLoggedIn, isAuthorized} = require('../middleware')

router.post('/admin/warehouses/:id/products',isLoggedIn,isAuthorized, productHandlers.createProduct);

router.get('/admin/warehouses/:id/products',isLoggedIn,isAuthorized, productHandlers.getAllProducts);

router.get('/admin/warehouses/:id/products/:productId',isLoggedIn,isAuthorized, productHandlers.getProductById);

router.put('/admin/warehouses/:id/products/:productId',isLoggedIn,isAuthorized, productHandlers.updateProductById);

router.delete('/admin/warehouses/:id/products/:productId',isLoggedIn,isAuthorized, productHandlers.deleteProductById);

router.get('/products/near',isLoggedIn, productHandlers.findProductsNearUser);

module.exports = router;
