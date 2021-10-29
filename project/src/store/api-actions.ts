// import {AppRoute, AuthorizationStatus} from '../const';
// import {authorizationInfo, requireAuthorization} from './action';
//
// export const checkAuth = () => (dispatch, _getState, api) => (
//   api.get(AppRoute.SignIn)
//     .then(({data}) => dispatch(authorizationInfo(data)))
//     .then(() => dispatch(requireAuthorization(AuthorizationStatus.Auth)))
//     .catch(() => {})
// );

// import {State} from '../types/state';
import {Dispatch} from 'redux';
import {Action, ThunkActionResult} from '../types/action-types';
import {AxiosInstance} from 'axios';
import {Endpoints} from '../services/api';
import {getOffers, loadData} from './action';
import {adaptOfferToClient} from './adapter';

export const fetchOffers = (): ThunkActionResult =>
  async (dispatch: Dispatch<Action>, _getState, api: AxiosInstance): Promise<void> => {
    dispatch(loadData(true));
    try {
      const {data} = await api.get(Endpoints.Offers);
      const hotels = data.map((hotel: any) => adaptOfferToClient(hotel));
      dispatch(getOffers(hotels));
    } catch (error) {
      // @TODO later
    }
    finally {
      dispatch(loadData(false));
    }
  };
