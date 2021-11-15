import {AppRoute, AuthorizationStatus, Endpoints} from '../const';
import {
  getFavoritesList,
  getOffers,
  loadingData,
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  updateOffer
} from './action';
import {Dispatch} from 'redux';
import {Action, ThunkActionResult} from '../types/action-types';
import {AxiosInstance} from 'axios';
import {adaptOfferToClient, adaptReviewToClient} from './adapter';
import {AuthData, Offer, Review, ReviewData} from '../types/types';
import {dropToken, saveToken} from '../services/token';

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    // try {
    await api.get(Endpoints.Login)
      .then(() => {
        // можно ил это сделать за один вызов
        dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
        dispatch(loadingData(false));
      });
  };
  //     catch (error) {
  //     // @TODO later
  //   }
  //   finally {
  //     dispatch(loadingData(false));
  //   }
  // };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete(Endpoints.Logout);
    dropToken();
    dispatch(requireLogout());
  };

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch: Dispatch<Action>, _getState, api: AxiosInstance): Promise<void> => {
    dispatch(loadingData(true));
    try {
      const {data} = await api.get<unknown>(Endpoints.Offers);
      if (!Array.isArray(data)) {
        throw new Error('data is not array');
      }
      const hotels = data.map((hotel: unknown) => adaptOfferToClient(hotel));
      dispatch(getOffers(hotels));
    } catch (error) {
      // @TODO later
    }
    finally {
      dispatch(loadingData(false));
    }
  };


export const getNearByOffersAction = (offerId: number): ThunkActionResult =>
  async (dispatch: Dispatch<Action>, _getState, api: AxiosInstance): Promise<void> => {
    // dispatch(loadingData(true));
    try {
      const {data} = await api.get<unknown>(`${Endpoints.Offers}/${offerId}/nearby`);
      if (!Array.isArray(data)) {
        throw new Error('data is not array');
      }
      const nearBy = data.map((offer: unknown) => adaptOfferToClient(offer));
      const offer = _getState().offersList.find((off) => off.id === offerId);

      if(offer) {
        const updatedOffer: Offer = {...offer, nearBy};
        dispatch(updateOffer(updatedOffer));
      }
    } catch (error) {
      // @TODO later
    }
    finally {
      // dispatch(loadingData(false));
    }
  };

export const getFavoritesAction = (): ThunkActionResult =>
  async (dispatch: Dispatch<Action>, _getState, api: AxiosInstance): Promise<void> => {
    try {
      const {data} = await api.get<unknown>(Endpoints.Favorite);
      if (!Array.isArray(data)) {
        throw new Error('data is not array');
      }
      const hotels = data.map((hotel: unknown) => adaptOfferToClient(hotel));
      dispatch(getFavoritesList(hotels));
    } catch (error) {
      // @TODO later
    }
  };

export const changeFavoritesAction = (offerId: number | undefined, status: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post(`${Endpoints.Favorite}/${offerId}/${status}`);
      const hotel = data.map((offer: unknown) => adaptOfferToClient(offer));
      const offer = _getState().offersList.find((off) => off.id === offerId);
      if(offer) {
        const updatedOffer: Offer = {...offer, isFavorite: hotel.isFavorite};
        dispatch(updateOffer(updatedOffer));
      }
    } catch (error) {
      // @TODO later
    }
  };


export const getReviewsAction = (offerId: number): ThunkActionResult =>
  async (dispatch: Dispatch<Action>, _getState, api: AxiosInstance): Promise<void> => {
    try {
      const {data} = await api.get<Review[]>(`${Endpoints.Reviews}/${offerId}`);
      const review = data.map((comment: unknown) => adaptReviewToClient(comment));
      const offer = _getState().offersList.find((off) => off.id === offerId);
      if(offer) {
        const updatedOffer: Offer = {...offer, review};
        dispatch(updateOffer(updatedOffer));
      }
    } catch (error) {
      // @TODO later
    }
  };

export const sendOfferReview = (offerId: number, {rating, comment}: ReviewData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post<Review[]>(`${Endpoints.Reviews}/${offerId}`, {rating, comment});
      const review = data.map((comm: unknown) => adaptReviewToClient(comm));
      const offer = _getState().offersList.find((off) => off.id === offerId);
      if(offer) {
        const updatedOffer: Offer = {...offer, review};
        dispatch(updateOffer(updatedOffer));
      }
    } catch (error) {
      // @TODO later
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post(Endpoints.Login, {email, password});
    saveToken(data.token);
    //можно ли сделать это за один вызов?
    dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.Auth, authEmail: data.email, authAvatar: data.avatar_url}));
    dispatch(redirectToRoute(AppRoute.Main));
  };
