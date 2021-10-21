import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {City, Host, Point} from './types/types';
import {reviews} from './mocks/reviews';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {getOffers} from './store/action';

// describe api data structure only
export type Offer = {
  id: number,
  images: string,
  price: number,
  title: string,
  type: string,
  rating: number,
  isFavorite: boolean,
  isPremium: boolean,
  city: City,
  location: Point,
}

export type OfferDetails = {
  goods: string[],
  host: Host,
  bedrooms: number,
  maxAdults: number,
  previewImage: string,
}


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

const store = createStore(reducer, composeWithDevTools());
store.dispatch(getOffers(offers));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offers} reviews={reviews}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

