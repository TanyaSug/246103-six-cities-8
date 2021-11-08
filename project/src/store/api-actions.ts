import {AppRoute, AuthorizationStatus} from '../const';
import {redirectToRoute, requireAuthorization, requireLogout, updateOffer} from './action';
import {Dispatch} from 'redux';
import {Action, ThunkActionResult} from '../types/action-types';
import {AxiosInstance} from 'axios';
import {getOffers, loadingData} from './action';
import {adaptOfferToClient} from './adapter';
import {AuthData, Offer} from '../types/types';
import {Endpoints} from '../const';
import {dropToken, saveToken, Token} from '../services/token';

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    // try {
    await api.get(Endpoints.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
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

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(Endpoints.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
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
      const {data} = await api.get<Offer[]>(Endpoints.Offers);
      const hotels = data.map((hotel: any) => adaptOfferToClient(hotel));
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
      const {data} = await api.get<Offer[]>(`${Endpoints.Offers}/${offerId}/nearby`);
      const nearBy = data.map((offer: any) => adaptOfferToClient(offer));
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


// export const fetchReviewAction = (hotelId: number): ThunkActionResult =>
//   async (dispatch: Dispatch<Action>, _getState, api: AxiosInstance): Promise<void> => {
//     try {
//       const {data} = await api.get<Review[]>(`${Endpoints.Reviews}/${hotelId}`);
//       const reviews = data.map((review: any) => adaptReviewToClient(review));
//       dispatch(getReviews(reviews));
//     } catch (error) {
//       // @TODO later
//     }
//   };
