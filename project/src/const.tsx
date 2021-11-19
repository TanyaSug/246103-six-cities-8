import {PointTuple} from 'leaflet';

export enum AppRoute {
  SignIn = '/login',
  OfferDetails = '/offer/:id',
  Favorites = '/favorites',
  Main = '/',
}

export enum HttpCode {
  Unauthorized = 401,
}

export enum Endpoints {
  Offers =  '/hotels',
  Logout = '/logout',
  Login = '/login',
  Favorite = '/favorite',
  Reviews = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown= 'UNKNOWN'
}

export enum Titles {
  FavoriteTitle = 'Saved listing',
  YourReview = 'Your review',
}

export const AUTH_TOKEN_KEY_NAME = 'favorite-hotel-token';
export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_ACTIVE = 'img/pin-active.svg';
export const ICON_SIZE: PointTuple = [40, 40];
export const ICON_ANCHOR: PointTuple = [20, 40];
export const CITIES_LIST = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const RATING_VALUES = ['5', '4', '3', '2', '1'];
export const SIGN_IN = ' Sign in';
export const SIGN_OUT = 'Sign out';
export const REVIEW_COUNT = 10;

export const SortingTypes = {
  POPULAR: 'Popular',
  PRICE_LOW: 'Price: low to high',
  PRICE_HIGH: 'Price: high to low',
  RATING: 'Top rated first',
};

export const MAX_IMAGES = 6;
export const MIN_LENGTH_REVIEW = 50;
export const RATING = 5;
export const PERCENT = 100;
export const NEAR_OFFERS_COUNT = 3;
export const EN_US = 'en-US';

export const AltText = {
  PLACE_IMG: 'Place image',
  PHOTO_STUDIO: 'Photo studio',
  CITIES_LOGO: '6 cities logo',
};

export const OfferType: {[key: string]: string} = {
  apartment: 'Apartment',
  room: 'Private room',
  house: 'House',
  hotel: 'Hotel',
};


