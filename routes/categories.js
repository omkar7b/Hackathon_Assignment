const express = require('express');
const router = express.Router();

const Category = require('../models/categories');
const { addCategory } = require('../controllers/categories');
const { authenticate } = require('../middleware/authentication');

router.post('/add-category', authenticate, addCategory);

module.exports = router;