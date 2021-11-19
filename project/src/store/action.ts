import {ActionType} from '../types/action-types';
import {AppRoute} from '../const';
import {AuthInfo, Offer, Review} from '../types/types';


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

export const getFavoritesList = (favorites: Offer[]) => ({
  type: ActionType.GetFavoritesList,
  payload: favorites,
} as const);

export const deleteFavoriteOffer = (offerId: number) => ({
  type: ActionType.DeleteFavoriteOffer,
  payload: offerId,
} as const);

export const updateOffer = (updatedOffer: Offer) => ({
  type: ActionType.UpdateOffer,
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


export const requireAuthorization = (userInfo: AuthInfo) => ({
  type: ActionType.RequireAuthorization,
  payload: userInfo,
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


