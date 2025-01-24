import { body, query } from 'express-validator'
export const emailValidation = body('email').isEmail().withMessage('Email is invalid').notEmpty().withMessage('Email is required')
export const passwordValidation = body('password').notEmpty().withMessage('Password is required').notEmpty().withMessage('Password is required')
const usernameValidation = body('username').notEmpty().withMessage('Username is required').notEmpty().withMessage('Username is required')
const tokenValidation = body('token').notEmpty().withMessage('Token is required')
export const registerValidation = [
    emailValidation,
    passwordValidation,
    usernameValidation
];

export const loginValidation = [
    emailValidation,
    passwordValidation,
    body('type').isIn([1, 2, 3]).withMessage('Invalid login type').notEmpty().withMessage('Login type is required')
];

export const resetPasswordValidation = [
    passwordValidation,
    tokenValidation
]