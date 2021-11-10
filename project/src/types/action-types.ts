// import {Offer} from '../index';
import { ThunkAction, ThunkDispatch} from 'redux-thunk';
import { AxiosInstance } from 'axios';
import {
  toggleActiveCity,
  getOffers,
  requireAuthorization,
  loadingData,
  requireLogout,
  setActiveCard,
  redirectToRoute,
  getReviews,
  changeSorting,
  updateOffer
} from '../store/action';
import {State} from './state';

export enum ActionType {
  ToggleActiveCity = 'places/toggleActiveCity',
  GetOffersList = 'places/getOffersList',
  GetReviews = 'places/getReviews',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  LoadingData = 'data/loadingData',
  SetActiveCard = 'map/makeActiveCard',
  RedirectToRoute = 'places/redirectToRoute',
  ReplaceOffer = 'places/replaceOffer',
  ChangeSorting = 'places/changeSorting',
}


export type Action =
  | ReturnType<typeof toggleActiveCity>
  | ReturnType<typeof getOffers>
  | ReturnType<typeof getReviews>
  | ReturnType<typeof updateOffer>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof loadingData>
  | ReturnType<typeof setActiveCard>
  | ReturnType<typeof changeSorting>
  | ReturnType<typeof redirectToRoute>;


export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
