import { Request, Response, NextFunction } from "express";
import { HttpException } from "./http-exception";
import { IErrorResponse } from "./interface.ts/error-response";
import { ValidationError } from "./validation-error";

export function exceptionFilter(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errorResponse: Partial<IErrorResponse> = {};

  if (Object.keys(err).length === 0) {
    errorResponse.status = 500;
  }
  if (err instanceof HttpException) {
    errorResponse.codeError = err.statusCode;
    errorResponse.message = err.message;
    errorResponse.method = req.method;
    errorResponse.path = req.path;
    errorResponse.status = err.statusCode;
  } else if (err instanceof SyntaxError) {
    errorResponse.codeError = 405;
    errorResponse.message = err.message;
    errorResponse.method = req.method;
    errorResponse.path = req.path;
    errorResponse.status = 405;
  } else if (err instanceof ValidationError) {
    errorResponse.codeError = err.statusCode;
    errorResponse.message = err.message;
    errorResponse.method = req.method;
    errorResponse.path = req.path;
    errorResponse.status = err.statusCode;
  }

  errorResponse.message = err.message

  res.status(errorResponse.status || 500).json(errorResponse);
}
