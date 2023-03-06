import {
  EMAIL_OR_PASSWORD_IS_NOT_CORRECT,
  THIS_EMAIL_ALREADY_EXISTS,
} from "../../../app/constant/error.constant";
import { statusCode } from "../../../app/constant/status-code.constant";
import { HttpException } from "../../../common/exception/http-exception";
import { UsersEntity } from "../../../app/entities/users.entity";
import { BaseService } from "../../../common/services/base.service";
import {
  IOkData,
  IOkStatus,
  IFail,
} from "../../../common/services/interface/base-service.interface";
import { ICreateUser, ILogin } from "./interface/auth.interface";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export class UserService extends BaseService<UsersEntity> {
  constructor(private readonly _userRepository = UsersEntity) {
    super();
  }

  findAll(...[]: any): Promise<IOkData<UsersEntity[]>> {
    throw new Error("Method not implemented.");
  }
  public async create(body: ICreateUser): Promise<IOkStatus> {
    const user = await this._userRepository.findOne({
      where: { email: body.email },
    });

    if (user) {
      throw new HttpException(statusCode.BadRequest, THIS_EMAIL_ALREADY_EXISTS);
    }

    await this._userRepository.create(body);

    return { status: 1, message: "Created" };
  }

  public async login(body: ILogin): Promise<IOkData<UsersEntity>> {
    const { email, password } = body;

    const user = await this._userRepository.findOne({
      where: { email },
      attributes: ["id", "firstName", "lastName", "password", 'roles'],
    });

    if (!user) {
      throw new HttpException(
        statusCode.BadRequest,
        EMAIL_OR_PASSWORD_IS_NOT_CORRECT
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException(
        statusCode.BadRequest,
        EMAIL_OR_PASSWORD_IS_NOT_CORRECT
      );
    }

    //@ts-ignore
    user.setDataValue('password', undefined)

    const token = this._generateToken(user);

    return this._ok({
      status: 1,
      data: user,
      metadata: { accessToken: token },
    });
  }

  private _generateToken(user: UsersEntity) {
    const token = jwt.sign({ user }, process.env.JWT_TOKEN || "1234", {
      expiresIn: "1h",
    });
    return token;
  }

  update(...[]: any): Promise<IOkStatus> | Promise<IFail> {
    throw new Error("Method not implemented.");
  }
  delete(...[]: any): Promise<IOkStatus> {
    throw new Error("Method not implemented.");
  }
}

export const userService = new UserService();
