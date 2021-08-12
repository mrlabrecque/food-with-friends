import { Matches } from "./matches.model";

export class User {
  _id: number;
  name: string;
  email: string;
  avatar: string;
  likes: Matches[];
}
