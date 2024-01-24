const Sib = require('sib-api-v3-sdk');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const Resetpassword = require('../models/resetPassword');
const { UUIDV4 } = require('sequelize');
const { response } = require('express');

exports.forgotPassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ where: { email: email } });
        //console.log('called');
        if (user) {
            const id = uuid.v4();

            user.createResetpassword({ id, isactive: true })
                .then((result) => {
                    console.log('Create Forgotpassword Completed');

                    const client = Sib.ApiClient.instance;
                    const apiKey = client.authentications['api-key'];
                    apiKey.apiKey = process.env.API_KEY;

                    const tranEmailApi = new Sib.TransactionalEmailsApi();

                    const sender = {
                        email: 'omkarbende777@gmail.com',
                        name: 'Omkar @ DigitalFlake',
                    };

                    const receivers = [
                        {
                            email: req.body.email,
                        },
                    ];

                    tranEmailApi.sendTransacEmail({
                        sender,
                        to: receivers,
                        subject: 'Reset Password',
                        htmlContent: `<h2>Reset Password</h2>
                        <p> <a href='http://localhost:3000/password/resetpassword'>Click Here</a> to reset password</p>`,
                    })
                    .then((result) => {
                       
                        res.status(202).json({
                            success: true,
                            message: 'Reset Password Link sent successfully',
                        });
                    })
                    .catch((error) => {
                        console.error('SendinBlue Error:', error.response ? error.response.body : error.message);
                        throw new Error(error);
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                    throw new Error(error);
                });
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Catch Error:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};


//Incomplete controller
