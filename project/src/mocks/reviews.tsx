import {Review} from '../index';

export const reviews: Review[] = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-05-08T14:13:56.569Z',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'img/1.png',
      id: 4,
      isPro: false,
      name: 'Max',
    },
  },
  {
    comment: '',
    date: '2016-05-10T14:20:56.569Z',
    id: 2,
    rating: 5,
    user: {
      avatarUrl: 'img/1.png',
      id: 4,
      isPro: true,
      name: 'Igor',
    },
  },
  {
    comment: 'A very uncomfortable place. Do not recommend.',
    date: '2018-07-08T11:13:56.569Z',
    id: 3,
    rating: 2,
    user: {
      avatarUrl: 'img/1.png',
      id: 4,
      isPro: false,
      name: 'Inna',
    },
  },
  {
    comment: 'Nice place and a wonderful view.',
    date: '2018-06-12T04:13:46.569Z',
    id: 4,
    rating: 1,
    user: {
      avatarUrl: 'img/1.png',
      id: 4,
      isPro: true,
      name: 'Ivan',
    },
  },
];
