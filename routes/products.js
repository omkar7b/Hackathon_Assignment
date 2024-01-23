const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authentication');
const { addProduct } = require('../controllers/products');

router.post('/add-product', authenticate, addProduct);

module.exports = router;