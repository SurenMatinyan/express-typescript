import { Router } from "express";
import { AuthMiddleware } from "../../../common/middleware/auth.middleware";
import { ProductsController } from "../../controllers/products.controller";
import { validate } from "../../validators/validator";
import * as productsValidation from "../../validators/products.validators";

const router = Router();

router.post(
  "/create",
  validate(productsValidation.createProduct),
  AuthMiddleware,
  //@ts-ignore
  ProductsController.create
);
//@ts-ignore
router.put(
  "/update/:id",
  validate(productsValidation.updateProduct),
  AuthMiddleware,
  //@ts-ignore
  ProductsController.update
);
//@ts-ignore
router.delete("/:id", AuthMiddleware, ProductsController.delete);
//@ts-ignore
router.get('', ProductsController.findAll)

export default router;
