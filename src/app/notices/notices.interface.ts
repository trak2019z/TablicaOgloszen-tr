export interface Notice {
  id?: string;
  groupId?: string;
  userId: string;
  title: string;
  content: string;
  creationDate: string;
  expirationDate?: string;
}

export interface NoticeHome extends Notice{
  authoFirstName: string;
  authorLastName: string;
  groupName?: string;
}
