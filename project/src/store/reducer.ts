import {State} from '../types/state';
import {CITIES_LIST} from '../const';
import {Action, ActionType} from '../types/action';
// import {offers} from '../mocks/offers';


const initialState: State = {
  activeCity: CITIES_LIST[0],
  offersList: [],
};

export const reducer = (state: State = initialState, action: Action):State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, activeCity: action.payload};
    case ActionType.GetOffersList:
      // return {...state, offersList: action.payload.filter((offer) => offer.city.name === state.activeCity)};
      return {...state, offersList: action.payload};
    default:
      return state;
  }
};
