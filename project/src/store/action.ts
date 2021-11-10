import {ActionType} from '../types/action-types';
import {AppRoute, AuthorizationStatus} from '../const';
import {Offer, Review} from '../types/types';
// import {createAction} from '@reduxjs/toolkit';

export const toggleActiveCity = (city: string) => ({
  type: ActionType.ToggleActiveCity,
  payload: city,
} as const);

export const changeSorting = (selectedSortType: string) => ({
  type: ActionType.ChangeSorting,
  payload: selectedSortType,
} as const);

export const getOffers = (offer: Offer[]) => ({
  type: ActionType.GetOffersList,
  payload: offer,
} as const);

export const updateOffer = (updatedOffer: Offer) => ({
  type: ActionType.ReplaceOffer,
  payload: updatedOffer,
} as const);

export const getReviews = (review: Review[]) => ({
  type: ActionType.GetReviews,
  payload: review,
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

// export const loadReviews = (reviews: unknown) => ({
//   type: ActionType.LoadReviews,
//   payload: reviews,
// } as const);

