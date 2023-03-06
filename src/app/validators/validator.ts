import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validate = (valueSchem: Joi.ObjectSchema) => {
  const mid = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = valueSchem.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    return next();
  };

  return mid;
};
