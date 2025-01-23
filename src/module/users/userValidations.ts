import { body, query } from 'express-validator'

export const registerValidation = [
    body('email').isEmail().withMessage('Email is invalid').notEmpty().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').notEmpty().withMessage('Password is required'),
    body('username').notEmpty().withMessage('Username is required').notEmpty().withMessage('Username is required')
];

export const loginValidation = [
    body('email').isEmail().withMessage('Email is invalid').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required').notEmpty().withMessage('Password is required'),
    body('type').isIn([1, 2, 3]).withMessage('Type must be one of the following values: 1, 2, 3').notEmpty().withMessage('Type is required')
];
