const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
    fullName :{
        firstName:{
            type : String,
            required : true,
            minlength : [3, 'Firstname must be at least 3 characters'],
        },
        lastName :{
            type : String,
            minlength : [ 'Lastname must be at least 3 characters'],
        }
    },
    email :{
        type : String,
        required : true,
        unique: true,
        lowercase: true,
        match: [/^|S+@|S+|,|S+$/, 'Please enter a valid email address'],
    },
    password: {
        type : String,
        required : true,
        select:false,
    },
    socketId:{
        type : String,

    },
    status:{
        type:String,
        enum:['online','offline'],
        default: 'offline'
    },
    vehicle:{
        color:{
            type : String,
            required:true,
            minlength:[3, 'Color must be at least 3 characters'],
        },
        plate:{
            type : String,
            required:true,
            minlength:[3, 'Plate number must be at least 3 characters'],
        },
        capacity:{
            type : Number,
            required:true,
            minlength:[1, 'Capacity must be at least 1 characters'],
        },
        vehicleType:{
            type : String,
            required:true,
            enum: ['car', 'motorcycle', 'auto'],
        }
    },
    location:{
        latitude : {
            type : Number,
        },
        longitude:{
            type : Number,
        }
    }

})

captainSchema.methods.getAuthToken = function (){
    const token = jwt.sign({__id: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
    return token;
}
captainSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
}
captainSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10)
}

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;