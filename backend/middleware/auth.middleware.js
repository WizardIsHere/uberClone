const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const blackListTokenModel = require('../models/blacklistToken.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.authenticateUser = async (req, res, next) => {

    const token =
        req.cookies.token ||
        (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
            ? req.headers.authorization.split(' ')[1]
            : null);


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, Token not provided!' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized, User not found!' });
        }

        req.user = user;
        return next();
    }catch (e) {
        return res.status(401).json({ message: 'Unauthorized, Invalid token!' });
    }

}

module.exports.authenticateCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split('')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, Token not provided!' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({token: token});
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized, Invalid token!' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded.__id);

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized, Captain not found!' });
        }
        req.captain = captain;
        return next();
    }catch (e) {
        return res.status(401).json({ message: 'Unauthorized, Invalid token!' });
    }
}