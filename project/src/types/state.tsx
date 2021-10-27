import {Offer} from '../index';
import {AuthorizationStatus} from '../const';

export type State = {
  activeCity: string,
  offersList: Offer[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
}
