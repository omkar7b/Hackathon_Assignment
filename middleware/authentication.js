const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authenticate = async (req, res, next) => {
    try {
        const token  = req.header('authorization');
        const decodedToken = jwt.verify(token, 'secretKey');

        const user = await User.findByPk(decodedToken.userId);
        req.user = user;
        next();
    }
    catch (error) {
        console.log('authentication error',error);
        return res.status(401).json({success: false})
    }
}

module.exports = authenticate;