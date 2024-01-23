const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');

const User = require('./models/users');
const Category = require('./models/categories');

const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');

const app = express();

app.use(bodyParser.json({extended: false}));
app.use(cors());


app.use('/user', userRoutes);
app.use('/category', categoryRoutes);

User.hasMany(Category);
Category.belongsTo(User);


sequelize.sync()
.then(() => {
    app.listen(3000);
    console.log('Connected');
})
.catch((error) => {
    console.log(error);
})