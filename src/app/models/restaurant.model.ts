/* eslint-disable @typescript-eslint/naming-convention */
export class Restaurant {

  rating: number;
  price: string;
  phone: string;
  id: string;
  alias: string;
  is_closed: boolean;
  categories: [
    {
      alias: string;
      title: string;
    }
  ];
  review_count: number;
  name: string;
  url: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  image_url: string;
  location: {
    city: string;
    country: string;
    address2: string;
    address3: string;
    state: string;
    address1: string;
    zip_code: string;
  };
  distance: number;
  transactions: string[];
  liked: boolean;
}
