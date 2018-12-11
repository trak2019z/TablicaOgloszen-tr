import { Group } from '../groups/group.interface';

export interface UserDetail {
  userId?: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  email: string;
  groups?: UserGroup[];
}

export interface UserGroup {
  groupId: string;
  role: string;
  additionDate: string;
  groupDetial?: Group
}
