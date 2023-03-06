import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../common/exception/http-exception";
import {
  TOKEN_NOT_FOUND,
  TOKEN_TYPE_IS_NOT_CORRECT,
} from "../../app/constant/error.constant";
import { statusCode } from "../../app/constant/status-code.constant";
import * as jwt from "jsonwebtoken";
import { UsersEntity } from "../../app/entities/users.entity";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      throw new HttpException(statusCode.Forbidden, TOKEN_NOT_FOUND);
    }
    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];
    if (bearer !== "Bearer" || !token) {
      throw new HttpException(statusCode.Forbidden, TOKEN_TYPE_IS_NOT_CORRECT);
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_TOKEN || "1234"
    ) as UsersEntity;
    req["user"] = decoded['user'];
    next();
  } catch ({ message }) {
    res.json({ message, status: 403 });
  }
};
