import { User } from './user';

export class Entry {
  public _id: String;
  public title: String;
  public createdAt: Date;
  public user: User;
  public tags: String[];
  public scope: String;
  public text: String;
}
