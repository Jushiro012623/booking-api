import { Router } from 'express';
import user, { login, logout,register } from './userController'
import catchAsync from '../../utils/catchAsync';
import {requireGuestUser, requireAuthUser} from '../../middlewares/authMiddleware' 
import { registerValidation, loginValidation } from './userValidations';
import requiredRoles from "../../middlewares/roleMiddleware"

const userRouter  = Router();

const adminMiddleware = [requireAuthUser, requiredRoles(['admin'])]
// Admin Routes for Module Users
userRouter.get("/users/", adminMiddleware, user.getAll);
userRouter.post("/users/", adminMiddleware, user.createOne);
userRouter.get("/users/:id", adminMiddleware, user.getOne);
userRouter.put("/users/:id", adminMiddleware, user.updateOne);
userRouter.delete("/users/:id", adminMiddleware, user.deleteOne);

// Authentication Routes
userRouter.post("/login", requireGuestUser,loginValidation, catchAsync(login));
userRouter.post("/register",requireGuestUser, registerValidation, register);
userRouter.post("/logout",requireAuthUser, logout);



export default userRouter ;
