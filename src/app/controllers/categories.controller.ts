import { IRequest } from "src/common/interface/request.interface";
import categoriesService, {
  CategoriesService,
} from "../services/categories/categories.service";
import {
  ICreateCategory,
  IUpdateCategory,
} from "../services/categories/interface/categories.interface";
import { NextFunction, Response } from "express";

export class CategoriesController {
  static async create(
    req: IRequest<ICreateCategory>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const payload = await categoriesService.create(req.user, req.body);
      return res.status(201).json(payload);
    } catch ({ message }) {
      return next({ message, statusCode: 500 });
    }
  }

  static async update(
    req: IRequest<IUpdateCategory>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const payload = await categoriesService.update(
        req.user,
        req.body,
        req.params.id
      );
      return res.status(202).json(payload);
    } catch ({ message }) {
      return next({ message, statusCode: 500 });
    }
  }

  static async delete(req: IRequest, res: Response, next: NextFunction) {
    try {
      const payload = await categoriesService.delete(req.user, req.params.id);
      return res.status(202).json(payload);
    } catch ({ message }) {
      return next({ message, statusCode: 500 });
    }
  }
}
