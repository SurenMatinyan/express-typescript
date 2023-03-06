import { UserRoles } from "../enum/user-roles.enum";

export interface IUser {
  id: string;
  roles: UserRoles[];
}
