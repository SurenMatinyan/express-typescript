import { NextFunction } from "express";

export interface INextFunction extends NextFunction {
  statusCode: number;
  message: string;
}
