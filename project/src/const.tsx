export enum AppRoute {
  SignIn = '/login',
  OfferDetails = '/offer/:id',
  Favorites = '/favorites',
  Main = '/',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
}

export enum Titles {
  FavoriteTitle = 'Saved listing',
  YourReview = 'Your review',
}

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_ACTIVE = 'img/pin-active.svg';

export const CITIES_LIST = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
