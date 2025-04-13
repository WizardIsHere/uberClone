const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const {validationResult} = require('express-validator')

module.exports.registerCaptain = async(req, res, next) => {
    console.log(req.body)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    console.log(req.body)
    const { fullName, email, password, vehicle } = req.body;
    console.log("email",vehicle)

    const isCaptainAlreadeExists = await captainModel.findOne({email});
    if (isCaptainAlreadeExists) {
        return res.status(400).json({ message: "Captain already exists" })
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email: email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    })
    const token = captain.getAuthToken();
    res.status(200).json({token, captain});

}