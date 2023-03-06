import { UUIDV4 } from "sequelize";
import {
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  Model,
  BelongsTo,
  BeforeSave,
  Scopes,
} from "sequelize-typescript";
import { ICreateProduct } from "../services/products/interface/products.interface";
import { IImages } from "./interface/catalogs.interface";
import * as bcrypt from "bcrypt";
import { ICreateUser } from "../services/user/interface/auth.interface";
import { UserRoles } from "src/common/enum/user-roles.enum";

@Scopes(() => ({
  defaultScope: {
    attributes: { exclude: ["password"] },
  },
}))
@Table({
  modelName: "users",
})
export class UsersEntity extends Model<UsersEntity, ICreateUser> {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @BeforeSave
  static async hashPasswordBeforeSave(user: UsersEntity) {
    if (user.isNewRecord) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }

  @Column({ type: DataType.STRING, field: "first_name" })
  firstName: string;

  @Column({ type: DataType.STRING, field: "last_name" })
  lastName: string;

  @Column({ type: DataType.JSONB })
  roles: UserRoles[];

  @CreatedAt
  @Column({ type: DataType.DATE, field: "created_date" })
  createdDate: string;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: "updated_date" })
  updatedDate: string;
}
