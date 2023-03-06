import { Model } from "sequelize-typescript";
import { IUser } from "../interface/user.interface";
import { IFail, IOkData, IOkStatus } from "./interface/base-service.interface";

export abstract class BaseService<T extends Model> {
  protected _ok(payload: IOkStatus): IOkStatus;
  protected _ok<T>(payload: IOkData<T>): IOkData<T>;
  protected _ok<T>(payload: IOkData<T> | IOkStatus): IOkData<T> | IOkStatus {
    return payload;
  }

  protected _fail(message?: string): IFail {
    return { status: 0, message: message ? message : "Wrong request" };
  }

  public abstract findAll(...[]: any): Promise<IOkData<T[]>>;

  public abstract create(...[]: any): Promise<IOkStatus>;

  public abstract update(...[]: any): Promise<IOkStatus> | Promise<IFail>;

  public abstract delete(...[]: any): Promise<IOkStatus>;

  protected _checkUserRole(user: IUser) {
    return user.roles;
  }
}
