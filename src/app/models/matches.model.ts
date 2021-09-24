import { Restaurant } from "./restaurant.model";

/* eslint-disable @typescript-eslint/naming-convention */
export class Matches {
  _id?: number;
  memberMatches?: number[];
  noOfMatches?: number;
  matchPercent?: number;
  trueMatch?: boolean;
  restaurant: Restaurant;

}
