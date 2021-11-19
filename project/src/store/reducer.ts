import {State} from '../types/state';
import {AuthorizationStatus, CITIES_LIST, SortingTypes} from '../const';
import {Action, ActionType} from '../types/action-types';
import {Offer} from '../types/types';


const initialState: State = {
  activeCity: CITIES_LIST[0],
  activeSorting: SortingTypes.POPULAR,
  activeCardId: undefined,
  offersList: [],
  favoritesList: [],
  userInfo: {
    authorizationStatus: AuthorizationStatus.Unknown,
  },
  isDataLoading: false,
};

const reducer = (state: State = initialState, action: Action):State => {
  switch (action.type) {
    case ActionType.ToggleActiveCity:
      return {...state, activeCity: action.payload};
    case ActionType.ChangeSorting:
      return {...state, activeSorting: action.payload};
    case ActionType.GetOffersList:
      return {...state, offersList: action.payload};
    case ActionType.GetFavoritesList:
      return {...state, favoritesList: action.payload};
    case ActionType.DeleteFavoriteOffer:
      return {...state, favoritesList: state.favoritesList
        .filter((offer: Offer) => offer.id !== action.payload)};
    case ActionType.RequireAuthorization:
      return {...state, userInfo: action.payload};
    case ActionType.LoadingData:
      return {...state, isDataLoading: action.payload};
    case ActionType.SetActiveCard:
      return {...state, activeCardId: action.payload};
    case ActionType.RequireLogout:
      return {...state, userInfo: {authorizationStatus: AuthorizationStatus.NoAuth}};
    case ActionType.UpdateOffer:
      return {...state, offersList: state.offersList
        .map((offer: Offer) => offer.id === action.payload.id ? action.payload : offer)};
    default:
      return state;
  }
};

export {reducer};
