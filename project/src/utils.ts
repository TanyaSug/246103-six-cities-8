import {CITIES_LIST, PERCENT, RATING, SortingTypes} from './const';
import {Offer, Review} from './types/types';

export const sortPlaces = (hotels: Offer[], sortingType: string): Offer[]  => {
  switch (sortingType) {
    case SortingTypes.PRICE_LOW:
      return [...hotels].sort((a, b) => (a.price - b.price));
    case SortingTypes.PRICE_HIGH:
      return [...hotels].sort((a, b) => (b.price - a.price));
    case SortingTypes.RATING:
      return [...hotels].sort((a, b) => (b.rating - a.rating));
    default:
      return [...hotels];
  }
};

export const getRating = (part = 0):string => `${(PERCENT * part) / RATING}%`;

export const randomCity = CITIES_LIST[Math.floor(Math.random() * CITIES_LIST.length)];

const compareLessThan = (a:string,b:string) => a<b?-1:0;

export const sortReviews = ((a: Pick<Review,'date'>, b: Pick<Review,'date'>): number => (a.date > b.date?1:compareLessThan(a.date, b.date)));

export const isRecord = (offer: unknown): offer is Record<string, unknown> => typeof offer === 'object' && offer !== null;

