import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/Auth.controller";
import { handleInputErrors } from "../middleware/validation.middleware";

const authRoutes = Router();

authRoutes.post(
  "/create-account",
  body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password tienen que tener minimo 8 caracteres"),
  body("password_confirmation").custom((value, { req }) => {
    if(value !== req.body.password){
        throw new Error('Los Password no son iguales')
    }
    return true
  }),
  body("email").isEmail().withMessage("E-mail no valido"),
  handleInputErrors,
  AuthController.createAccount
);

export default authRoutes;
