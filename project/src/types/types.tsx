export type Offer = {
  id: number,
  images: string[],
  price: number,
  title: string,
  type: string,
  rating: number,
  isFavorite: boolean,
  isPremium: boolean,
  goods: string[],
  host: Host,
  bedrooms: number,
  maxAdults: number,
  previewImage: string,
  city: City,
  location: Point,
}

export type Review = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string
  }
}

export type Data = {
  offers: Offer[],
  reviews: Review[],
}

export type City = {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  }
  name: string
};

export type Point = {
  zoom: number;
  latitude: number;
  longitude: number;
};

export type Host = {
  avatarUrl: string,
    hostId: number,
  isPro: boolean,
  hostName: string,
};

export type AuthData = {
  login: string;
  password: string;
};

