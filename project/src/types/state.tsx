import {AuthInfo, Offer} from './types';

export type State = {
  activeCity: string,
  activeCardId: number | undefined,
  offerDetailsCardId: number | undefined,
  offersList: Offer[],
  favoritesList: Offer[],
  userInfo: AuthInfo,
  isDataLoading: boolean,
  activeSorting: string,
}
