import * as Joi from "joi";
import {
  ICreateCategory,
  IUpdateCategory,
} from "../services/categories/interface/categories.interface";
import { ICreateProduct } from "../services/products/interface/products.interface";

export const createCategory = Joi.object<ICreateCategory>({
  name: Joi.string().required(),
  parentId: Joi.string().optional(),
});

export const updateCategory = Joi.object<IUpdateCategory>({
  name: Joi.string().required(),
});
