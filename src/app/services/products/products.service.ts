import { literal, Op } from "sequelize";
import {
  NOT_FOUND,
  PRODUCT_ARE_NOT_BELONGS_TO_YOU,
} from "../../constant/error.constant";
import { statusCode } from "../../constant/status-code.constant";
import { UserRoles } from "../../../common/enum/user-roles.enum";
import { HttpException } from "../../../common/exception/http-exception";
import { IUser } from "../../../common/interface/user.interface";
import { BaseService } from "../../../common/services/base.service";
import {
  IFail,
  IOkData,
  IOkStatus,
} from "../../../common/services/interface/base-service.interface";
import { ProductsEntity } from "../../entities/products.entity";
import {
  ICreateProduct,
  IFindProductQuery,
  IUpdateProduct,
} from "./interface/products.interface";

export class ProductsService extends BaseService<ProductsEntity> {
  constructor(private readonly _productRepository: typeof ProductsEntity) {
    super();
  }
  async create(user: IUser, body: ICreateProduct): Promise<IOkStatus> {
    const userRoles = this._checkUserRole(user);

    if (!userRoles.includes(UserRoles.Seller)) {
      return this._fail();
    }

    await this._productRepository.create({ ...body, creatorId: user.id });

    return this._ok({ message: "Created", status: 1 });
  }

  async update(
    user: IUser,
    body: IUpdateProduct,
    productId: string
  ): Promise<IOkStatus> {
    const product = await this._productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new HttpException(statusCode.NotFound, NOT_FOUND);
    }

    if (product.creatorId !== user.id) {
      throw new HttpException(
        statusCode.NotFound,
        PRODUCT_ARE_NOT_BELONGS_TO_YOU
      );
    }

    await this._productRepository.update(body as any, {
      where: { id: productId },
    });

    return this._ok({ message: "Updated", status: 1 });
  }

  async delete(user: IUser, productId: string): Promise<IOkStatus> {
    const product = await this._productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new HttpException(statusCode.NotFound, NOT_FOUND);
    }

    if (product.creatorId !== user.id) {
      throw new HttpException(
        statusCode.NotFound,
        PRODUCT_ARE_NOT_BELONGS_TO_YOU
      );
    }

    await product.destroy();

    return this._ok({ status: 1, message: "Deleted" });
  }

  async findAll(query: IFindProductQuery): Promise<IOkData<ProductsEntity[]>> {
    const querySer: any = {};
    let tags = [];

    if (query.tags) {
      tags = JSON.parse(query.tags as any);
    }

    if (query.productId) {
      querySer.categoryId = query.productId;
    }

    if (query.description) {
      querySer.description = {
        [Op.iLike]: `%${query.description}%`,
      };
    }

    if (query.name) {
      querySer.name = {
        [Op.like]: `%${query.name}%`,
      };
    }

    if (tags && tags.length) {
      querySer.tags = {
        [Op.and]: [
          literal(
            `tags @> '[${tags.map((tag) => `"${tag}"`).join(", ")}]'::jsonb`
          ),
        ],
      };
    }

    const data = await this._productRepository.findAll({
      attributes: {
        include: ["tags"],
      },
      where: {
        ...querySer,
      },
    });

    return this._ok({ status: 1, data, metadata: {} });
  }
}

export default new ProductsService(ProductsEntity);
