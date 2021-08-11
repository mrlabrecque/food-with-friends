export class Matches {
  _id?: number;
  name?: string;
  placeId?: string;
  photoUrl?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  price_level?: number;
  rating?: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_ratings_total?: number;
  memberMatches?: number[];
  noOfMatches?: number;
  matchPercent?: number;
  trueMatch?: boolean;

}
