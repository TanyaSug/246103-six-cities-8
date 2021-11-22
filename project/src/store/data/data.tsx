// import {ActionType} from "../../types/action-types";
// import {Offer} from '../../types/types';
// import {State} from '../../types/state';
// import {AuthorizationStatus, CITIES_LIST, SortingTypes} from '../../const';
import {createReducer} from '@reduxjs/toolkit';
import {getOffers, getFavoritesList, loadingData, deleteFavoriteOffer, updateOffer} from '../action-new';
import {Data} from '../../types/state-new';
import {Offer} from '../../types/types';


const initialState: Data = {
  offersList: [],
  favoritesList: [],
  isDataLoading: false,
};

const offerData = createReducer(initialState, (builder) => {
  builder.addCase(getOffers,(state, action) => {
    state.offersList = action.payload;
  });
  builder.addCase(getFavoritesList, (state, action) => {
    state.favoritesList = action.payload;
  });
  builder.addCase(loadingData, (state, action) => {
    state.isDataLoading = action.payload;
  });
  builder.addCase(deleteFavoriteOffer, (state, action) => {
    state.favoritesList = state.favoritesList
      .filter((offer: Offer) => offer.id !== action.payload);
  });
  builder.addCase(updateOffer, (state, action) => {
    state.offersList = state.offersList
      .map((offer: Offer) => offer.id === action.payload.id ? action.payload : offer);
  });
});
export {offerData};
