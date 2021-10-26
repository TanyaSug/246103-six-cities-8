import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {City, Host, Point} from './types/types';
import {reviews} from './mocks/reviews';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {requireAuthorization} from './store/action';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {AuthorizationStatus} from './const';
import {fetchOffers} from './store/api-actions';
import {ThunkAppDispatch} from './types/action-types';


export type Offer = {
  id: number,
  images: string[],
  price: number,
  title: string,
  type: string,
  rating: number,
  isFavorite: boolean,
  isPremium: boolean,
  goods: string[],
  host: Host,
  bedrooms: number,
  maxAdults: number,
  previewImage: string,
  city: City,
  location: Point,
}

// export type OfferDto =  {
//   bedrooms: number,
//   city: City,
//   description: string,
//   goods: string[],
//   host: {
//     avatar_url: string,
//     id: number,
//     is_pro: boolean,
//     name: string,
//   },
//   id: number,
//   images: string[],
//   is_favorite: boolean,
//   is_premium: boolean,
//   location: Point,
//   max_adults: number,
//   preview_image: string,
//   price: number,
//   rating: number,
//   title: string,
//   type: string,
// }

// export type OfferDetails = {
//   goods: string[],
//   host: Host,
//   bedrooms: number,
//   maxAdults: number,
//   previewImage: string,
// }


export type Review = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string
  }
}

export type Data = {
  offers: Offer[],
  reviews: Review[],
}
const api = createAPI( () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));
// (store.dispatch as ThunkAppDispatch)(checkAuthAction());
// store.dispatch(getOffers(offers));
(store.dispatch as ThunkAppDispatch)(fetchOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offers} reviews={reviews}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

