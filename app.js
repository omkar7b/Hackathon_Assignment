const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');

//models
const User = require('./models/users');
const Category = require('./models/categories');
const Product = require('./models/products');
const CategoryProduct = require('./models/categoryProduct');

//routes
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const resetPasswordRoutes = require('./routes/resetPassword');


const app = express();

app.use(bodyParser.json({extended: false}));
app.use(cors());


app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/password', resetPasswordRoutes);

// table relationships 
User.hasMany(Category);
Category.belongsTo(User);

User.hasMany(Product)
Product.belongsTo(User)

Category.belongsToMany(Product, { through: 'CategoryProduct' });
Product.belongsToMany(Category, { through: 'CategoryProduct' });


sequelize.sync()
.then(() => {
    app.listen(3000);
    console.log('Connected');
})
.catch((error) => {
    console.log(error);
})