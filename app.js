const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const sequelize = require('./util/database');
const User = require('./models/users');

const app = express();

app.use(bodyParser.json({extended: false}));
app.use(cors());



// app.post('/user/login' , (req,res,next) => {
    
// })


sequelize.sync()
.then(() => {
    app.listen(3000);
    console.log('Connected');
})
.catch((error) => {
    console.log(error);
})