import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import passport from "passport";

const userRouter = Router();
const userController = new UserController();

// Ruta para el registro de usuarios
userRouter.post("/register", userController.register);

// Ruta para el login de usuarios
userRouter.post("/login", userController.login);

// Ruta para el logout de usuarios
userRouter.post("/logout", userController.logout);

// Ruta para obtener información del usuario actual
userRouter.get("/current", passport.authenticate("current", { session: false }), userController.current);

export { userRouter };
