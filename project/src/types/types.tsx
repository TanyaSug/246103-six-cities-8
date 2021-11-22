import {AuthorizationStatus} from '../const';

export type AuthInfo = {
  authorizationStatus: AuthorizationStatus,
  authAvatar?: string,
  authEmail?: string,
}

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
  description: string;
  city: City,
  location: Location,
  nearBy: Offer[],
  review: Review[],
}

type User = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string
};

export type Review = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: User,
}

export type Data = {
  offers: Offer[],
  reviews: Review[],
}

export type City = {
  location: Location,
  name: string,
};

export type Location = {
  zoom: number,
  latitude: number,
  longitude: number,
};

export type Host = {
  avatarUrl: string,
    hostId: number,
  isPro: boolean,
  name: string,
};

export type AuthData = {
  login: string,
  password: string,
  onSuccess?: (() => void) | undefined,
  onFail?: ((error:unknown) => void) | undefined,
};

export type ReviewData = {
  rating: number,
  comment: string,
}


