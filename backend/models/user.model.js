const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'Firstname must be at least 3 characters long'],
            maxlength: 50
        },
        lastName: {
            type: String,
            minlength: [3, 'Lastname must be at least 3 characters long'],
            maxlength: 50
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false // hide password in response
    },
    socketId:{
        type: String,
        // required: true,
        // unique: true
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User',userSchema);

module.exports =userModel;