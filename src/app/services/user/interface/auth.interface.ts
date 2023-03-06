import { UserRoles } from "src/common/enum/user-roles.enum";

export interface ICreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: UserRoles[]
}

export interface ILogin {
  email: string;
  password: string;
}
