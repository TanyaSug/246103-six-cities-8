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

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_ACTIVE = 'img/pin-active.svg';

export const ICON_SIZE: PointTuple = [40, 40];

export const ICON_ANCHOR: PointTuple = [20, 40];

export const CITIES_LIST = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
