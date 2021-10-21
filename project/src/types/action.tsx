import {Offer} from '../index';

export enum ActionType {
  ChangeCity = 'places/changeCity',
  GetOffersList = 'places/getOffersList',
}


export type ChangeCityAction = {
  type: ActionType.ChangeCity;
  payload: string;
};

export type GetOffersListAction = {
  type: ActionType.GetOffersList;
  payload: Offer[];
};

export type Action = ChangeCityAction | GetOffersListAction;
