import {State} from '../types/state';
import {CITIES_LIST} from '../const';
import {Actions} from '../types/action';
// import {offers} from '../mocks/offers';


const initialState = {
  activeCity: CITIES_LIST[0],
  offersList: null,
};

export const reducer = (state: State = initialState, action: Actions):State => {
  switch (action.type) {
    // case ActionType.ChangeCity:
    //   return {...state, activeCity};
    // case ActionType.GetOffersList:
    //   return {...state, offersList};
    default:
      return state;
  }
};
