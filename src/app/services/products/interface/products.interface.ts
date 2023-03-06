import { IImages } from "src/app/entities/interface/catalogs.interface";

export interface ICreateProduct {
  name: string;
  description: string;
  price: string;
  images: IImages[];
  tags: string[];
  creatorId: string;
  categoryId: string;
}

export interface IUpdateProduct {
  name: string;
  description: string;
  price: string;
  images: IImages[];
  tags: string[];
}

export interface IFindProductQuery {
  productId?: string;
  tags: string[];
  name: string;
  description: string;
}
