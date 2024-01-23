const Product = require('../models/products');
const CategoryProduct = require('../models/categories');
const AWS = require('aws-sdk');
const multer = require('multer');


exports.addProduct = async (req, res, next) => {
    try {
        const { category, description, packSize, price, status } = req.body;

        // if(!category || !description || !packSize || !price || !status){
        //     throw new Error('Please Fill in all the Fields');
        // }

        const newProduct = await req.user.createProduct({
            category:category, 
            description: description,  
            packSize: packSize, 
            price: price, 
            status: status
        })

            res.status(200).json({success: true, message: 'Product added'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({success:false, error: 'Internal Server Error'});
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const products = await Product.findAll({where: { userId: req.user.id }});
        console.log(products)
        res.status(200).json({success: true, products});
    }
    catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        console.log(error);
    }   
}

exports.editProduct = async (req, res, next) => {
    try {
        const editId = req.params.id;
        const { category, description, status, price, packSize, productImage } = req.body;

        console.log(editId, category);

        const editProduct = await Product.findOne({ where : { id: editId, userId: req.user.id}})

        await Product.update(
            { category: category, description: description, price: price, packSize: packSize, status: status },
            { where: { id: editId, userId: req.user.id } }
        )
        res.status(200).json({message: 'Category Edited Successfully', Product})
        console.log(editProduct);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
}

exports.deleteProduct = async (req, res, next) =>{
    try {
        const deleteId = req.params.id;
        
        await Product.destroy({ where: {id: deleteId, userId:req.user.id }});
        res.status(200).json({success: true, message: 'Category Deleted SuccesFully'});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}


//AWS s3 for storing image => Not able to send object and formData in one request
// function uploadToS3(data, filename) {
//     let s3Bucket = new AWS.S3({
//         accessKeyId: process.env.IAM_USER_KEY,
//         secretAccessKey: process.env.IAM_USER_SECRET
//     })

//     let params = {
//         Bucket: process.env.BUCKET_NAME,
//         Key: filename,
//         Body: data,
//         ACL: 'public-read',
//     }

//     return new Promise((res, rej) => {
//         s3Bucket.upload(params, (err, s3response) => {
//             if (err) {
//                 console.log('Something Went Wrong at s3 upload', err);
//                 rej(err);
//             } else {
//                 res(s3response.Location);
//             }
//         })
//     })
// }

