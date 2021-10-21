export enum ActionType {
  ChangeCity = 'places/changeCity',
  GetOffersList = 'places/getOffersList',
}


export type ChangeCityAction = {
  type: ActionType.ChangeCity;
};

export type GetOffersListAction = {
  type: ActionType.GetOffersList;
};

export type Actions = ChangeCityAction | GetOffersListAction;
