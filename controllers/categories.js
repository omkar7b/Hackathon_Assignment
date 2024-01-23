const Category = require('../models/categories');

exports.addCategory = async (req, res, next) => {
    try {
        const { category, description, status } = req.body;

        if(!category || !description || !status){
            throw new Error('Please Fill in all the Fields');
           // res.status(400).json({message: 'Please Fill in all the Feilds'});
        }

        const newCategory = await req.user.createCategory({
            category: category,
            description: description,
            status: status
        });
            res.status(200).json({message: 'Category Added', success: true, newCategory});
    }
    catch (error) {

        console.log(error)
        res.status(500).json({ error: 'Internal Server Error'});
       
    };
};


exports.getCategory = async (req, res, next) => {
    try {
        const categories = await Category.findAll({where: { userId: req.user.id }});
        console.log(categories)
        res.status(200).json({success: true, categories});
    }
    catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        console.log(error);
    }   
}

exports.editCategory = async (req, res, next) => {
    try {
        const editId = req.params.id;
        const { category, description, status} = req.body;

        console.log(editId, category);

        const editCategory = await Category.findOne({ where : { id: editId, userId: req.user.id}})

        await Category.update(
            { category: category, description: description, status: status },
            { where: { id: editId, userId: req.user.id } }
        )
        res.status(200).json({message: 'Category Edited Successfully'})
    }
    catch(error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
}


exports.deleteCategory = async (req, res, next) =>{
    try {
        const deleteId = req.params.id;
        
        await Category.destroy({ where: {id: deleteId, userId:req.user.id }});
        res.status(200).json({success: true, message: 'Category Deleted SuccesFully'});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}