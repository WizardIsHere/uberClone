const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware')


router.post('/register', [
    body('fullName.firstName').isLength({min: 3}).withMessage('First Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
    // body('confirmPassword').custom((value, {req}) => value === req.body.password).withMessage('Passwords do not match')
], userController.registerUser)


router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long')
], userController.loginUser)

router.get('/profile',authMiddleware.authenticateUser, userController.getUserProfile)

router.get('/logout', authMiddleware.authenticateUser, userController.logoutUser)

module.exports = router;