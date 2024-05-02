const express = require('express')
const mongoose = require('mongoose');
const userRoutes = require("./routes/users");
const bodyParser = require("body-parser");
const warehouseRoutes=require("./routes/warehouse")
const productRoutes=require('./routes/products')
const orderRoutes = require("./routes/order");

const app = express();


// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/mobulous';
mongoose.connect('mongodb://localhost:27017/mobulous').then(result =>{
    console.log('mongoose Connected!');
}).catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", orderRoutes);
app.use("/api", productRoutes);
app.use("/api/admin",warehouseRoutes)

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`Serving on port ${port}`)
})