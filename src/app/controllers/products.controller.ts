import { IRequest } from "src/common/interface/request.interface";
import { Response, NextFunction, Request } from "express";
import {
  ICreateProduct,
  IUpdateProduct,
} from "../services/products/interface/products.interface";
import productsService from "../services/products/products.service";

export class ProductsController {
  static async create(
    req: IRequest<ICreateProduct>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const payload = await productsService.create(req.user, req.body);
      return res.status(201).json(payload);
    } catch ({ message }) {
      return next({ message, statusCode: 500 });
    }
  }

  static async update(
    req: IRequest<IUpdateProduct>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const payload = await productsService.update(
        req.user,
        req.body,
        req.params.id
      );
      return res.status(202).json(payload);
    } catch ({ message }) {
      return next({ message, statusCode: 500 });
    }
  }

  static async delete(
    req: IRequest<ICreateProduct>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const payload = await productsService.delete(req.user, req.params.id);
      return res.status(202).json(payload);
    } catch ({ message }) {
      return next({ message, statusCode: 500 });
    }
  }

  static async findAll(
    req: IRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const payload = await productsService.findAll(req.query as any);
      return res.status(202).json(payload);
    } catch ({ message }) {
      return next({ message, statusCode: 500 });
    }
  }
}
