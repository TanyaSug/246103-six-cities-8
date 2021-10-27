// import {Offer} from '../index';
import { ThunkAction, ThunkDispatch} from 'redux-thunk';
import { AxiosInstance } from 'axios';
import {toggleActiveCity,getOffers, requireAuthorization} from '../store/action';
import {State} from './state';

export enum ActionType {
  ToggleActiveCity = 'places/toggleActiveCity',
  GetOffersList = 'places/getOffersList',
  RequireAuthorization = 'user/requireAuthorization',
  AUTHORIZATION_INFO = 'user/authorizationInfo',
}
//
//
// export type ChangeCityAction = {
//   type: ActionType.ChangeCity;
//   payload: string;
// };
//
// export type GetOffersListAction = {
//   type: ActionType.GetOffersList;
//   payload: Offer[];
// };

export type Action =
  | ReturnType<typeof toggleActiveCity>
  | ReturnType<typeof getOffers>
  | ReturnType<typeof requireAuthorization>;


export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
