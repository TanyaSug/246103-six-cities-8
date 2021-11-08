import {AuthorizationStatus} from '../const';
import {Offer, Review} from './types';


export type State = {
  activeCity: string,
  activeCardId: number | undefined,
  offersList: Offer[],
  authorizationStatus: AuthorizationStatus,
  isDataLoading: boolean,
  reviews: Review[],
  activeSorting: string,
}
