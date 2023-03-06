import { UUIDV4 } from "sequelize";
import {
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
  Model,
} from "sequelize-typescript";
import { ICreateCategory } from "../services/categories/interface/categories.interface";

@Table({
  modelName: "categories",
})
export class CategoriesEntity extends Model<CategoriesEntity, ICreateCategory> {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @BelongsTo(() => CategoriesEntity, "parentId")
  parent: CategoriesEntity;

  @Column({ field: "parent_id" })
  parentId: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  created_date: string;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updated_date: string;
}
