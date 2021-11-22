import {ActionType} from '../types/action-types-new';
import {AppRoute} from '../const';
import {AuthInfo, Offer, Review} from '../types/types';
import {createAction} from '@reduxjs/toolkit';


export const toggleActiveCity = createAction(ActionType.ToggleActiveCity,(city: string) => ({
  payload: city,
}));

export const changeSorting = createAction(ActionType.ChangeSorting, (selectedSortType: string) => ({
  payload: selectedSortType,
}));

export const getOffers = createAction(ActionType.GetOffers, (offer: Offer[]) => ({
  payload: offer,
}));

export const getFavoritesList = createAction(ActionType.GetFavoritesList, (favorites: Offer[]) => ({
  payload: favorites,
}));

export const deleteFavoriteOffer = createAction(ActionType.DeleteFavoriteOffer, (offerId: number) => ({
  payload: offerId,
}));

export const updateOffer = createAction(ActionType.UpdateOffer, (updatedOffer: Offer) => ({
  payload: updatedOffer,
}));

export const getReviews = createAction(ActionType.GetReviews, (review: Review[]) => ({
  payload: review,
}));

export const loadingData = createAction(ActionType.LoadingData, (value: boolean) => ({
  payload: value,
}));

export const requireAuthorization = createAction(ActionType.RequireAuthorization, (userInfo: AuthInfo, loading?: boolean) => ({
  payload: {userInfo, loading},
}));

export const requireLogout = createAction (ActionType.RequireLogout);

export const setActiveCard = createAction(ActionType.SetActiveCard, (id: number | undefined) => ({
  payload: id,
}));

export const setOfferDetailsCardId = createAction(ActionType.SetOfferDetailsCardId, (id: number | undefined) => ({
  payload: id,
}));

export const redirectToRoute = createAction(ActionType.RedirectToRoute, (url: AppRoute) => ({
  payload: url,
}));
