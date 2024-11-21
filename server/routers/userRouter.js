const express = require('express');
const { loginController, logoutController, signupContorller } = require('../controllers/userController');
const { createToken } = require('../utils/jwtMiddleware');
const router = express.Router();

router.post('/login' ,loginController);
router.get('/logout', logoutController);
router.post('/signup', signupContorller);

module.exports = router;