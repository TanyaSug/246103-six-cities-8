import {State} from '../types/state';
import {AuthorizationStatus, CITIES_LIST} from '../const';
import {Action, ActionType} from '../types/action-types';
// import {offers} from '../mocks/offers';


const initialState: State = {
  activeCity: CITIES_LIST[0],
  activeCardId: undefined,
  offersList: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
  reviews: [],
};

const reducer = (state: State = initialState, action: Action):State => {
  switch (action.type) {
    case ActionType.ToggleActiveCity:
      return {...state, activeCity: action.payload};
    case ActionType.GetOffersList:
      // return {...state, offersList: action.payload.filter((offer) => offer.city.name === state.activeCity)};
      return {...state, offersList: action.payload};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    case ActionType.LoadingData:
      return {...state, isDataLoading: action.payload};
    case ActionType.SetActiveCard:
      return {...state, activeCardId: action.payload};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};

export {reducer};
