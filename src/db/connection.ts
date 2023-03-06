import { Sequelize } from "sequelize-typescript";
import { CategoriesEntity } from "../app/entities/categories.entity";
import { ProductsEntity } from "../app/entities/products.entity";
import { UsersEntity } from "../app/entities/users.entity";
import { Request, Response, NextFunction } from "express";

export async function connection() {
// req: Request,
// res: Response,
// next: NextFunction
  const sequelize = new Sequelize({
    dialect: "postgres",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 5432,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USER,
    models: [UsersEntity, ProductsEntity, CategoriesEntity],
    sync: { force: false },
  });

  // sequelize.addModels();
}
