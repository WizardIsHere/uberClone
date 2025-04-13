const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const captainController = require("../controllers/captain.controller");

router.post('/register', [
    body("email").isEmail().withMessage("Email is required"),
    body("fullName.firstName").isLength({min:3}).withMessage("Full name is required"),
    body("password").isLength({min:6}).withMessage("Password is required"),
    body('vehicle.color').isLength({min:3}).withMessage("Color is required"),
    body( 'vehicle.plate').isLength({min:3}).withMessage("Plate number is required"),
    body( 'vehicle.capacity').isLength({min:1}).withMessage("Capacity is required"),
    body( 'vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage("Invalid type"),
],
    captainController.registerCaptain
)

module.exports = router;