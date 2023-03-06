import { userService, UserService } from "../services/user/user.service";
import { NextFunction, Response, Request } from "express";
import { UsersEntity } from "../entities/users.entity";

class UsersController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = await userService.create(req.body);
      return res.status(201).json(payload);
    } catch ({ message }) {
      return next({ message, statusCode: 500 });
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = await userService.login(req.body);
      return res.status(201).json(payload);
    } catch ({ message }) {
      return next({ message, statusCode: 500 });
    }
  }
}

export default UsersController;
