import { Router } from "express";
import usersController from "../../../app/controllers/users.controller";
import * as authValidation from "../../validators/auth.validators";
import { validate } from "../../validators/validator";

const router = Router();

router.post(
  "/sign-up",
  validate(authValidation.signUp),
  usersController.create
);
router.post("/login", validate(authValidation.login), usersController.login);

export default router;
