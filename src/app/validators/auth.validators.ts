import * as Joi from "joi";
import { ICreateUser, ILogin } from "../services/user/interface/auth.interface";

export const signUp = Joi.object<ICreateUser>({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  roles: Joi.array().required(),
});

export const login = Joi.object<ILogin>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
