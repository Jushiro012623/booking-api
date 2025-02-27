
import { Request, Response } from 'express';
import {validationResult } from 'express-validator'

export default (req : Request, res : Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
}