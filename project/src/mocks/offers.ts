import {Offer} from '../index';

export const offers: Offer[] = [
  {
    id: 1,
    images: '../img/apartment-01.jpg',
    price: 120,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    rating: 4,
    isFavorite: false,
    isPremium: true,
    city: {
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 10,
      },
      name: 'Paris',
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
  },
  {
    id: 2,
    images: '../img/room.jpg',
    price: 80,
    title: 'Wood and stone place',
    type: 'Private offer-details',
    rating: 4,
    isFavorite: true,
    isPremium: false,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
  },
  {
    id: 3,
    images: '../img/apartment-02.jpg',
    price: 132,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    rating: 4,
    isFavorite: true,
    isPremium: false,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8,
    },
  },
  {
    id: 4,
    images: '../img/apartment-03.jpg',
    price: 180,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    rating: 5,
    isFavorite: false,
    isPremium: true,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8,
    },
  },
  {
    id: 5,
    images: '../img/room.jpg',
    price: 80,
    title: 'Wood and stone place',
    type: 'Private offer-details',
    rating: 4,
    isFavorite: false,
    isPremium: false,
    city: {
      location: {
        latitude: 52.3809553943508,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.929309666406198,
      zoom: 8,
    },
  },
];
