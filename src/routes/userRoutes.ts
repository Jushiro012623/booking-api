import { Router } from 'express';
import {login, register , logout } from '../controllers/userController'
import {isGuest, isAuthenticated} from '../middlewares/authMiddleware' 

const userRouter  = Router();

userRouter.post("/login", isGuest ,login);
userRouter.post("/register",isGuest, register);
userRouter.post("/logout",isAuthenticated, logout);

export default userRouter ;
