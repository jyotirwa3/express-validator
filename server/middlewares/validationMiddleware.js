const { body, validationResult } = require('express-validator');

const validateUser = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            const errorMessages = errors.array().map(error => ({ msg: error.msg }));
            return res.status(400).json({ errors: errorMessages });
        }
        next();
    },
];

module.exports = { validateUser };
