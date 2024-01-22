const User = require('../models/users');
const bcrypt = require('bcrypt');

exports.signUp = async (req,res,next) => {
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
}
