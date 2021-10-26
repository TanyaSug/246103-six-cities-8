import {State} from '../types/state';
import {AuthorizationStatus, CITIES_LIST} from '../const';
import {Action, ActionType} from '../types/action-types';
// import {offers} from '../mocks/offers';


const initialState: State = {
  activeCity: CITIES_LIST[0],
  offersList: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: Action):State => {
  switch (action.type) {
    case ActionType.ToggleActiveCity:
      return {...state, activeCity: action.payload};
    case ActionType.GetOffersList:
      // return {...state, offersList: action.payload.filter((offer) => offer.city.name === state.activeCity)};
      return {...state, offersList: action.payload};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload, isDataLoaded: true};
    default:
      return state;
  }
};

export {reducer};
