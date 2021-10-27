import {ActionType} from '../types/action-types';
import {Offer} from '../index';
import {AuthorizationStatus} from '../const';

export const toggleActiveCity = (city: string) => ({
  type: ActionType.ToggleActiveCity,
  payload: city,
} as const);

export const getOffers = (offers: Offer[]) => ({
  type: ActionType.GetOffersList,
  payload: offers,
} as const);


export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const authorizationInfo = (info: any) => ({
  type: ActionType.AUTHORIZATION_INFO,
  payload: info,
});
