import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers';

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
  offers: Offer[];
  // more
}

ReactDOM.render(
  <React.StrictMode>
    <App offers={offers} />
  </React.StrictMode>,
  document.getElementById('root'));

