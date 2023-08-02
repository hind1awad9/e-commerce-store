import { Role } from 'App/core/enums';

export interface User {
  username: string;
  password: string;
  role: Role;
}
