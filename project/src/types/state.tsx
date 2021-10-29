import {AuthorizationStatus} from '../const';
import {Offer, Review} from './types';

export type State = {
  activeCity: string,
  offersList: Offer[],
  authorizationStatus: AuthorizationStatus,
  isDataLoading: boolean,
  reviews: Review[],
}
