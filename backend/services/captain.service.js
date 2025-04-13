const captainModel = require("../models/captain.model");
const {validationResult} = require("express-validator");

module.exports.createCaptain = async ({firstName, email, password, color, plate, capacity, vehicleType}) => {

    console.log("creating captain", firstName, email, password, color, plate, capacity, vehicleType);
    if(!firstName || !email || !color || !plate || !capacity || !vehicleType || !vehicleType){
        throw new Error("All fields are required");
    }
    const captain = captainModel.create({
        fullName:{
            firstName
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain
}