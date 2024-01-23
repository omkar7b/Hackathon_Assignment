const Category = require('../models/categories');

exports.addCategory = async (req, res, next) => {
    try {
        const { category, description, status } = req.body;

        const newCategory = await Category.create({
            category: category,
            description: description,
            status: status
        });
        res.status(200).json({message: 'Category Added', success: true, newCategory});
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error'});
        console.log(error)
    };
};