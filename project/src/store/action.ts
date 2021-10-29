import {ActionType} from '../types/action-types';
import {AuthorizationStatus} from '../const';
import {Offer} from '../types/types';

export const toggleActiveCity = (city: string) => ({
  type: ActionType.ToggleActiveCity,
  payload: city,
} as const);

export const getOffers = (offer: Offer[]) => ({
  type: ActionType.GetOffersList,
  payload: offer,
} as const);

export const loadData = (value: boolean) => ({
  type: ActionType.LoadData,
  payload: value,
} as const);


export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const authorizationInfo = (info: any) => ({
  type: ActionType.AuthorizationInfo,
  payload: info,
});
