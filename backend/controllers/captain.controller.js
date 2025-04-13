const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const {validationResult} = require('express-validator')
const blacklistTokenModel = require("../models/blacklistToken.model");

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

module.exports.loginCaptain = async(req, res, next) => {
    console.log("request",req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    console.log("email",email);

    const captain = await captainModel.findOne({email}).select("+password");
    if (!captain) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = captain.getAuthToken();
    res.cookie("token", token);
    res.status(200).json({token, captain});
}

module.exports.getCaptainProfile = async(req, res, next) => {
    res.status(200).json({captain: req.captain});
}

module.exports.logoutCaptain = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split('')[1];
    await blacklistTokenModel.create({token});
    res.clearCookie("token");
    res.status(200).json({message: "Logged Out"});
}