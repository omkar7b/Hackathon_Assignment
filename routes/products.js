const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authentication');
const { addProduct, getProduct, editProduct, deleteProduct } = require('../controllers/products');

router.post('/add-product', authenticate, addProduct);
router.get('/get-product', authenticate, getProduct);
router.put('/edit-product/:id', authenticate, editProduct);
router.delete('/delete-product/:id', authenticate, deleteProduct);

module.exports = router;