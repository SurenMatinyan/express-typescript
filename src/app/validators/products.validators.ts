import * as Joi from "joi";
import {
  ICreateProduct,
  IUpdateProduct,
} from "../services/products/interface/products.interface";

export const createProduct = Joi.object<ICreateProduct>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  tags: Joi.array().required(),
  categoryId: Joi.string().required(),
});

export const updateProduct = Joi.object<IUpdateProduct>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  tags: Joi.array().required(),
});
