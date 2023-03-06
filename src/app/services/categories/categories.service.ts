import { YOU_CAN_NOT_CREATE_CATEGORY } from "../../../app/constant/error.constant";
import { statusCode } from "../../../app/constant/status-code.constant";
import { CategoriesEntity } from "../../../app/entities/categories.entity";
import { UserRoles } from "../../../common/enum/user-roles.enum";
import { HttpException } from "../../../common/exception/http-exception";
import { IUser } from "../../../common/interface/user.interface";
import { BaseService } from "../../../common/services/base.service";
import {
  IOkData,
  IOkStatus,
  IFail,
} from "../../../common/services/interface/base-service.interface";
import {
  ICreateCategory,
  IUpdateCategory,
} from "./interface/categories.interface"

export class CategoriesService extends BaseService<CategoriesEntity> {
  constructor(private readonly _categoriesRepository: typeof CategoriesEntity) {
    super();
  }
  
  findAll(...[]: any): Promise<IOkData<CategoriesEntity[]>> {
    throw new Error("Method not implemented.");
  }

  async create(user: IUser, body: ICreateCategory): Promise<IOkStatus> {
    const userRoles = this._checkUserRole(user);

    if (!userRoles.includes(UserRoles.Seller)) {
      throw new HttpException(
        statusCode.Forbidden,
        YOU_CAN_NOT_CREATE_CATEGORY
      );
    }

    await this._categoriesRepository.create(body);

    return this._ok({ status: 1, message: "Created" });
  }
  async update(
    user: IUser,
    body: IUpdateCategory,
    categoryId: string
  ): Promise<IOkStatus> {
    const userRoles = this._checkUserRole(user);

    if (!userRoles.includes(UserRoles.Seller)) {
      throw new HttpException(
        statusCode.Forbidden,
        YOU_CAN_NOT_CREATE_CATEGORY
      );
    }

    await this._categoriesRepository.update(body, {
      where: { id: categoryId },
    });

    return this._ok({ status: 1, message: "Updated" });
  }
  async delete(user: IUser, categoryId: string): Promise<IOkStatus> {
    const userRoles = this._checkUserRole(user);

    if (!userRoles.includes(UserRoles.Seller)) {
      throw new HttpException(
        statusCode.Forbidden,
        YOU_CAN_NOT_CREATE_CATEGORY
      );
    }

    await this._categoriesRepository.destroy({ where: { id: categoryId } });

    return this._ok({ status: 1, message: "Deleted" });
  }
}

export default new CategoriesService(CategoriesEntity);
