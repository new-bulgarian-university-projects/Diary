import { User } from './user';

export class Entry {
  public _id: string;
  public title: string;
  public createdAt: Date;
  public user: User;
  public tags: string[];
  public scope: string;
  public text: string;
}
