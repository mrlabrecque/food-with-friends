import { Restaurant } from './restaurant.model';

export class User {
  _id: number;
  name: string;
  email: string;
  avatar: string;
  likes: Restaurant[];
}
