import {AuthInfo, Offer} from './types';
import {RootState} from '../store/reducer-new';

export type Places = {
  activeCity: string,
  activeCardId: number | undefined,
  offerDetailsCardId: number | undefined,
  activeSorting: string,
}
export type Data = {
  offersList: Offer[],
  favoritesList: Offer[],
  isDataLoading: boolean,
}
export type User = {
  userInfo: AuthInfo,
  isDataLoading: boolean,
}
export type State = RootState;
