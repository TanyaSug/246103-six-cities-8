import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {Action} from 'redux';
import {State} from './state';

export enum ActionType {
  ToggleActiveCity = 'places/toggleActiveCity',
  GetOffers = 'data/getOffers',
  GetFavoritesList = 'data/getFavoritesList',
  DeleteFavoriteOffer = 'data/deleteFavoritesList',
  GetReviews = 'data/getReviews',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  LoadingData = 'data/loadingData',
  SetActiveCard = 'places/makeActiveCard',
  SetOfferDetailsCardId = 'places/makeOfferDetailsCardID ',
  RedirectToRoute = 'data/redirectToRoute',
  UpdateOffer = 'data/replaceOffer',
  ChangeSorting = 'places/changeSorting',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
