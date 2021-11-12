import {AuthorizationStatus} from '../const';
import {Offer} from './types';


export type State = {
  activeCity: string,
  activeCardId: number | undefined,
  offersList: Offer[],
  favoritesList: Offer[],
  userInfo: AuthInfo,
  isDataLoading: boolean,
  activeSorting: string,
}

export type AuthInfo = {
  authorizationStatus: AuthorizationStatus,
  authAvatar?: string,
  authEmail?: string,
}
