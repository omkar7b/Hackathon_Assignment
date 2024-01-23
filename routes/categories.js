const express = require('express');
const router = express.Router();

const Category = require('../models/categories');
const { addCategory, getCategory, editCategory, deleteCategory } = require('../controllers/categories');
const { authenticate } = require('../middleware/authentication');

router.post('/add-category', authenticate, addCategory);
router.get('/get-category', authenticate, getCategory);
router.put('/edit-category/:id', authenticate, editCategory);
router.delete('/delete-category/:id', authenticate, deleteCategory)

module.exports = router;