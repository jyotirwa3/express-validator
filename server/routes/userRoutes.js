const express = require('express');
const { registerUser } = require('../controllers/userController');
const { validateUser } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/register', validateUser, registerUser);

module.exports = router;
