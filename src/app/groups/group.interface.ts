import { UserDetail } from '../auth';

export interface Group {
  id?: string;
  name: string;
  description: string;
  creationDate: string;
  users?: GroupUser[];
}

export interface GroupUser {
  id: string;
  role: string;
  additionDate: string;
  userDetail?: UserDetail;
}

export const UserRoleEnum = [
  {value: 'ADMIN', viewValue: 'Administrator'},
  {value: 'EDITOR', viewValue: 'Redaktor'},
  {value: 'USER', viewValue: 'Zwykły użytkownik'}
];
