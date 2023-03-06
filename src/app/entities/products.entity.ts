import { UUIDV4 } from "sequelize";
import {
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { ICreateProduct } from "../services/products/interface/products.interface";
import { IImages } from "./interface/catalogs.interface";
import { UsersEntity } from "./users.entity";

@Table({
  modelName: "products",
})
export class ProductsEntity extends Model<ProductsEntity, ICreateProduct> {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.JSONB })
  images: IImages[];

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.JSONB })
  tags: string[];

  @Column({ type: DataType.INTEGER })
  price: number;

  @BelongsTo(() => UsersEntity, "creatorId")
  creator: UsersEntity;

  @Column({ field: "creator_id" })
  creatorId: string;

  @Column({ field: "category_id" })
  categoryId: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  created_date: string;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updated_date: string;
}
