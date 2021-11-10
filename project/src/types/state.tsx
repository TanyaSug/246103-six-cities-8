import {AuthorizationStatus} from '../const';
import {Offer} from './types';


export type State = {
  activeCity: string,
  activeCardId: number | undefined,
  offersList: Offer[],
  authorizationStatus: AuthorizationStatus,
  isDataLoading: boolean,
  activeSorting: string,
}
