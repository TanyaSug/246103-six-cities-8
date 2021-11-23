import { AuthorizationStatus, Endpoints, HttpCode, NUMBER} from '../const';
import {
  deleteFavoriteOffer,
  getFavoritesList,
  getOffers,
  loadingData,
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
import {isRecord} from '../utils';

const unknownErrorToString = (error: unknown): string => `${error}`;

const check401 = (error: unknown) => {

  if (!isRecord (error)) {
    return false;
  }
  const {response} = error;
  if (!isRecord (response)) {
    return false;
  }
  const {status} = response;
  return typeof status === NUMBER && status === HttpCode.Unauthorized;
};

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get (Endpoints.Login)
      .then (({data}) => {
        dispatch(requireAuthorization({
          authorizationStatus: AuthorizationStatus.Auth,
          authEmail: data.email,
          authAvatar: data.avatar_url,
        }, false));
      })
      .catch ((error:unknown) => {
        if (check401 (error)) {
          dispatch(requireAuthorization({
            authorizationStatus: AuthorizationStatus.NoAuth}, false));
          return;
        }
        throw new Error (unknownErrorToString(error));
      });
  };


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
        throw new Error ('Data is not array');
      }
      const hotels = data.map((hotel: unknown) => adaptOfferToClient(hotel));
      dispatch(getOffers(hotels));
    }
    finally {
      dispatch(loadingData(false));
    }
  };


export const getNearByOffersAction = (offerId: number | string, setErrorValue: (message: string) => void): ThunkActionResult =>
  async (dispatch: Dispatch<Action>, _getState, api: AxiosInstance): Promise<void> => {
    try {
      const {data} = await api.get<unknown>(`${Endpoints.Offers}/${offerId}/nearby`);
      if (!Array.isArray(data)) {
        throw new Error ('Data is not array');
      }
      const nearBy = data.map((offer: unknown) => adaptOfferToClient(offer));
      const offer = _getState().offersList.find((off) => off.id === offerId);

      if(offer) {
        const updatedOffer: Offer = {...offer, nearBy};
        dispatch(updateOffer(updatedOffer));
      }
    }  catch (error) {
      // const {response} = error;
      // if( response.status === HttpCode.NotFound) {
      //   dispatch(redirectToRoute(AppRoute.Error));
      //   return;
      // }
      // throw new Error (unknownErrorToString(error));
      if (isRecord(error) && typeof error.message === 'string') {
        setErrorValue(error.message);
      } else {
        setErrorValue('Have no idea what was going on');
      }
    }
  };

export const getFavoritesAction = (): ThunkActionResult =>
  async (dispatch: Dispatch<Action>, _getState, api: AxiosInstance): Promise<void> => {
    try {
      const {data} = await api.get<unknown>(Endpoints.Favorite);
      if (!Array.isArray(data)) {
        throw new Error('Data is not array');
      }
      const hotels = data.map((hotel: unknown) => adaptOfferToClient(hotel));
      dispatch(getFavoritesList(hotels));
    } catch (error) {
      throw new Error (unknownErrorToString(error));
    }
  };

export const changeFavoritesAction = (offerId: number, status: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post<Offer>(`${Endpoints.Favorite}/${offerId}/${status}`);
      const hotel =  adaptOfferToClient(data);
      const offer = _getState().offersList.find((off) => off.id === offerId);
      dispatch(deleteFavoriteOffer(offerId));
      if(offer) {
        const updatedOffer: Offer = {...offer, isFavorite: hotel.isFavorite};
        dispatch(updateOffer(updatedOffer));
      }
    }  catch (error) {
      throw new Error (unknownErrorToString(error));
    }
  };


export const getReviewsAction = (offerId: number | string, setErrorValue: (message: string) => void): ThunkActionResult =>
  async (dispatch: Dispatch<Action>, _getState, api: AxiosInstance): Promise<void> => {
    try {
      const {data} = await api.get<Review[]>(`${Endpoints.Reviews}/${offerId}`);
      const review = data.map((comment: unknown) => adaptReviewToClient(comment));
      const offer = _getState().offersList.find((off) => off.id === offerId);
      if (offer) {
        const updatedOffer: Offer = {...offer, review};
        dispatch(updateOffer(updatedOffer));
      }
    } catch (error) {
      // const {response} = error;
      // if( response.status === HttpCode.NotFound) {
      //   dispatch(redirectToRoute(AppRoute.Error));
      //   return;
      // }
      // throw new Error (unknownErrorToString(error));

      if (isRecord(error) && typeof error.message === 'string') {
        setErrorValue(error.message);
      } else {
        setErrorValue('Have no idea what was going on');
      }
    }
  };

export const sendOfferReview = (
  offerId: number,
  {rating, comment}: ReviewData,
  setErrorValue: (message: string) => void,
  setSubmittingFlag: (flag: boolean) => void,
  resetForm: () => void,
): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      setSubmittingFlag(true);
      const {data} = await api.post<Review[]>(`${Endpoints.Reviews}/${offerId}`, {rating, comment});
      const review = data.map((comm: unknown) => adaptReviewToClient(comm));
      const offer = _getState().offersList.find((off) => off.id === offerId);
      if (offer) {
        const updatedOffer: Offer = {...offer, review};
        dispatch(updateOffer(updatedOffer));
        resetForm();
      }
    } catch (error) {
      if (isRecord(error) && typeof error.message === 'string') {
        setErrorValue(error.message);
      } else {
        setErrorValue('Have no idea what was going on');
      }
    }
    setSubmittingFlag(false);
  };

export const loginAction = ({login: email, password, onSuccess, onFail}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try{
      const {data} = await api.post(Endpoints.Login, { email, password });
      saveToken(data.token);
      dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.Auth, authEmail: data.email, authAvatar: data.avatar_url}));
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
    catch(error){
      if(typeof onFail === 'function'){
        onFail(error);
      }
    }
  };
