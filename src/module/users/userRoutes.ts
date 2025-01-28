import { Router } from 'express';
import { user, forgotPassword, getSelf, login, logout,register, resetPassword, resetPasswordToken,updatePassword } from './userController'
import catchAsync from '../../utils/catchAsync';
import {requireGuestUser, requireAuthUser} from '../../middlewares/authMiddleware' 
import { registerValidation, loginValidation, emailValidation, resetPasswordValidation, passwordValidation } from './userValidations';
import requiredRoles from "../../middlewares/roleMiddleware"

const userRouter  = Router();

const adminMiddleware = [requireAuthUser, requiredRoles(['admin'])]
// Admin Routes for Module Users
userRouter.get("/admin/users/", adminMiddleware, user.getAll);
userRouter.post("/admin/users/", adminMiddleware, user.createOne);
userRouter.get("/admin/users/:id", adminMiddleware, user.getOne);
userRouter.put("/admin/users/:id", adminMiddleware, user.updateOne);
userRouter.delete("/admin/users/:id", adminMiddleware, user.deleteOne);

// Authenticated User Routes (Self)
userRouter.patch("/change-password", requireAuthUser, passwordValidation, catchAsync(updatePassword));
userRouter.get("/me", requireAuthUser, catchAsync(getSelf));
// userRouter.patch("/me", requireAuthUser, passwordValidation, catchAsync(updatePassword));

// Authentication Routes
userRouter.post("/login", requireGuestUser,loginValidation, catchAsync(login));
userRouter.post("/register",requireGuestUser, registerValidation, register);
userRouter.post("/logout",requireAuthUser, logout);
userRouter.post("/forgot-password",requireGuestUser, emailValidation, catchAsync(forgotPassword));
userRouter.get("/reset-password/:token",requireGuestUser, catchAsync(resetPasswordToken));
userRouter.post("/reset-password",requireGuestUser, resetPasswordValidation, catchAsync(resetPassword));



export default userRouter ;
