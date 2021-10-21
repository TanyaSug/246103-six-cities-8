import {Action, ActionType} from '../types/action';
import {Offer} from '../index';

export const toggleActiveCity = (city: string): Action => ({
  type: ActionType.ChangeCity,
  payload: city,
});

export const getOffers = (offers: Offer[]): Action => ({
  type: ActionType.GetOffersList,
  payload: offers,
});
