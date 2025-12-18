import { Router } from "express";
import { body, param } from "express-validator";
import { AuthController } from "../controllers/Auth.controller";
import { handleInputErrors } from "../middleware/validation.middleware";
import { authenticate } from "../middleware/auth.middleware";

const authRoutes = Router();

authRoutes.post(
  "/create-account",
  body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password tienen que tener minimo 8 caracteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los Password no son iguales");
    }
    return true;
  }),
  body("email").isEmail().withMessage("E-mail no valido"),
  handleInputErrors,
  AuthController.createAccount
);

authRoutes.post(
  "/confirm-account",
  body("token").notEmpty().withMessage("El Token no puede ir vacio"),
  handleInputErrors,
  AuthController.confirmAccount
);

authRoutes.post(
  "/login",
  body("email").isEmail().withMessage("E-mail no valido"),
  body("password").notEmpty().withMessage("El password no puede ir vacio"),
  handleInputErrors,
  AuthController.login
);

authRoutes.post(
  "/request-code",
  body("email").isEmail().withMessage("E-mail no valido"),
  handleInputErrors,
  AuthController.requestConfirmationCode
);

authRoutes.post(
  "/forgot-password",
  body("email").isEmail().withMessage("E-mail no valido"),
  handleInputErrors,
  AuthController.forgotPassword
);

authRoutes.post(
  "/validate-token",
  body("token").notEmpty().withMessage("El Token no puede ir vacio"),
  handleInputErrors,
  AuthController.validateToken
);

authRoutes.post(
  "/update-password/:token",
  param("token").isNumeric().withMessage('Token no valido'),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password tienen que tener minimo 8 caracteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los Password no son iguales");
    }
    return true;
  }),
  handleInputErrors,
  AuthController.updatePasswordWithToken
);

authRoutes.get('/user', authenticate,
  AuthController.user
)
export default authRoutes;
