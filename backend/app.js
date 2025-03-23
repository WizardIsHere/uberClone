const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();
const connectToDatabase= require('./db/db')
const userRoutes = require('./routes/user.routes')

// Connect to MongoDB
connectToDatabase();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


// Routes
app.get('/' , (req,res)=>{
    res.send('Hello, World!');
})
app.use('/users', userRoutes);

// =================================================================


module.exports = app;