import {SortingTypes} from './const';

export const sortPlaces = (hotels: any, sortingType: any) => {
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
