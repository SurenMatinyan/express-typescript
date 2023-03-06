import { Router } from "express";
import { AuthMiddleware } from "../../../common/middleware/auth.middleware";
import { CategoriesController } from "../../../app/controllers/categories.controller";
import { validate } from "../../validators/validator";
import * as categoriesValidation from "../../validators/categories.validator";
const router = Router();

router.post(
  "/create",
  validate(categoriesValidation.createCategory),
  AuthMiddleware,
  //@ts-ignore
  CategoriesController.create
);
//@ts-ignore
router.put(
  "/update/:id",
  validate(categoriesValidation.updateCategory),
  AuthMiddleware,
  //@ts-ignore
  CategoriesController.update
);
//@ts-ignore
router.delete("/:id", AuthMiddleware, CategoriesController.delete);

export default router;
