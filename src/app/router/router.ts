import { Express } from "express";
import productsRouter from "./routers/products";
import categoriesRouter from "./routers/categories";
import usersRouter from "./routers/users";

const API_PREFIX = "api";

const routersArr = [
  {
    path: "/products",
    route: productsRouter,
  },
  {
    path: "/categories",
    route: categoriesRouter,
  },
  {
    path: "/users",
    route: usersRouter,
  },
];

export default function route(app: Express) {
  routersArr.forEach((el) => {
    console.log(`Added Controller`, `/${API_PREFIX}${el.path}`);
    app.use(`/${API_PREFIX}${el.path}`, el.route);
  });
}
