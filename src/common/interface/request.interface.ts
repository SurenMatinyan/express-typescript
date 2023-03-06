import { Request } from "express";
import { IUser } from "./user.interface";

export interface IRequest<T = any> extends Request<any, any, T> {
  user: IUser;
}
