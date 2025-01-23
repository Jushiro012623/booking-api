import { Router } from 'express';
import user, { login, logout,register } from './userController'
import catchAsync from '../../utils/catchAsync';
import {isGuest, isAuthenticated} from '../../middlewares/authMiddleware' 
import { registerValidation, loginValidation } from './userValidations';
import restrictTo from "../../middlewares/roleMiddleware"

const userRouter  = Router();

userRouter.get("/users/", isAuthenticated,  catchAsync(user.getAll));
userRouter.post("/users/", isAuthenticated, catchAsync(user.createOne));
userRouter.get("/users/:id", isAuthenticated, catchAsync(user.getOne));
userRouter.put("/users/:id", isAuthenticated, catchAsync(user.updateOne));
userRouter.delete("/users/:id", isAuthenticated, catchAsync(user.deleteOne));


userRouter.post("/login", isGuest,loginValidation, catchAsync(login));
userRouter.post("/register",isGuest, registerValidation, register);
userRouter.post("/logout",isAuthenticated, logout);



export default userRouter ;
