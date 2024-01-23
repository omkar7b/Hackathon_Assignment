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

