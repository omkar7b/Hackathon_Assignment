const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req ,res , next) => {
    try {
        console.log('received')
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({message: 'Bad Request'});
        }

        const user = await User.findOne({where: {email: email}})
        console.log(email, password);

        if(user){
            res.status(409).json({message: 'User Already Exists Please Log in'})
        }

        bcrypt.hash(password, 10, async(error, hash) =>{
            if(error) {
                console.log(error);
            }
            const newUser = await User.create({
                email: email,
                password : hash
            });
            res.status(200).json({message: 'User created successfully', newUser: newUser, success: true})
        })
    }
    catch(error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
};

exports.logIn = async (req, res, next) => {
    try {
        console.log('called')
        const { email, password } = req.body;

        console.log(email)
        if(!email || !password){
            res.status(400).json({message: 'Bad Request'});
        }
        
        const user = await User.findAll({where: {email: email}})
        
        if(!user){
            res.status(404).json({message: 'User Not Found'});
        }

        if(user.length>0){
            bcrypt.compare(password, user[0].password, (error, result) => {
                if(error) {
                    console.log(error);
                }
                else if(result==true){
                    res.status(200).json({message: 'User Logged in Successfully', success:true, token : generateAccessToken(user[0].id, user[0].password)})
                    console.log('successful')
                }
                else {
                    res.status(401).json({success:false, message:'Incorrect Password or Email'});
                };
            })
        }
    }
    catch(error) {
        res.status(500).json({success: false, message: 'Internal Server Error'});
        console.log(error)
    }
}

function generateAccessToken(id, password){
    return jwt.sign({ userId: id, password: password }, process.env.SECRET_KEY);
}