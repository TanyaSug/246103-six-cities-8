import {Places} from '../../types/state-new';
import {createReducer} from '@reduxjs/toolkit';
import {CITIES_LIST, SortingTypes} from '../../const';
import {changeSorting, setActiveCard, setOfferDetailsCardId, toggleActiveCity} from '../action-new';


const initialState: Places = {
  activeCity: CITIES_LIST[0],
  activeSorting: SortingTypes.Popular,
  activeCardId: undefined,
  offerDetailsCardId: undefined,
};

const placeProcess = createReducer(initialState, (builder) => {
  builder.addCase(toggleActiveCity,(state, action) => {
    state.activeCity = action.payload;
  });
  builder.addCase(changeSorting,(state, action) => {
    state.activeSorting = action.payload;
  });
  builder.addCase(setActiveCard,(state, action) => {
    state.activeCardId = action.payload;
  });
  builder.addCase(setOfferDetailsCardId,(state, action) => {
    state.offerDetailsCardId = action.payload;
  });
});

export {placeProcess};
