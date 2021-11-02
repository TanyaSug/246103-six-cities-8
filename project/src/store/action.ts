import {ActionType} from '../types/action-types';
import {AppRoute, AuthorizationStatus} from '../const';
import {Offer} from '../types/types';
// import {createAction} from '@reduxjs/toolkit';

export const toggleActiveCity = (city: string) => ({
  type: ActionType.ToggleActiveCity,
  payload: city,
} as const);

export const getOffers = (offer: Offer[]) => ({
  type: ActionType.GetOffersList,
  payload: offer,
} as const);

export const loadingData = (value: boolean) => ({
  type: ActionType.LoadingData,
  payload: value,
} as const);


export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const setActiveCard = (id: number | undefined) => ({
  type: ActionType.SetActiveCard,
  payload: id,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);


