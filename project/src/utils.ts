import {PERCENT, RATING, SortingTypes} from './const';
import {Offer} from './types/types';

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
