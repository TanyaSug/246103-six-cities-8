// import {Offer, Review} from '../types/types';
import {City, Host, Offer, Review} from '../types/types';

const nullHost: Host = {
  avatarUrl: '',
  hostId: 0,
  name: '',
  isPro: false,
};

const isServerHost = (host: unknown): host is Record<string, unknown> => typeof host === 'object' && host !== null;

const toStringDefault = (value: unknown, def: string): string => typeof value === 'string' ? value : def;
const toNumberDefault = (value: unknown, def: number): number => typeof value === 'number' ? value : def;
const toBooleanDefault = (value: unknown, def: boolean): boolean => typeof value === 'boolean' ? value : def;
const toStringArray = (value:unknown):string[] => Array.isArray(value)?value.map((v)=>toStringDefault(v,'')):[];

const isRecord = (offer: unknown): offer is Record<string, unknown> => typeof offer === 'object' && offer !== null;

const toLocationExact = (value:unknown):City['location'] =>{
  if(!isRecord(value)){
    throw new Error('invalid argument');
  }
  return{
    latitude: toNumberDefault(value.latitude,0),
    longitude: toNumberDefault(value.longitude, 0),
    zoom: toNumberDefault(value.zoom,1),
  };
};

const toCityExact = (value:unknown):City=>{
  if(!isRecord(value)){
    throw new Error('invalid argument');
  }
  return {
    location: toLocationExact(value.location),
    name: toStringDefault(value.name,''),
  };
};

const adaptHost = (host: unknown): Host => {
  if (isServerHost(host)) {
    return {
      avatarUrl: toStringDefault(host['avatar_url'], ''),
      hostId: toNumberDefault(host['host_id'], 0),
      name: toStringDefault(host['host_name'], ''),
      isPro: toBooleanDefault(host['is_pro'], false),
    };
  }
  return nullHost;
};

export const adaptOfferToClient = (offer1: unknown): Offer => {
  if (!isRecord(offer1)) {
    throw new Error('invalid arg');
  }
  const offer = offer1;
  return {
    host: adaptHost(offer.host),
    isFavorite: toBooleanDefault(offer.is_favorite, false),
    isPremium: toBooleanDefault(offer.is_premium, false),
    maxAdults: toNumberDefault(offer.max_adults, 0),
    previewImage: toStringDefault(offer.preview_image, ''),
    id: toNumberDefault(offer.id, 0),
    bedrooms: toNumberDefault(offer.bedrooms, 0),
    city: toCityExact(offer.city),
    goods: toStringArray(offer.goods),
    images: toStringArray(offer.images),
    location: toLocationExact(offer.location),
    price: toNumberDefault(offer.price, 0),
    rating: toNumberDefault(offer.rating, 0),
    title: toStringDefault(offer.title, ''),
    type: toStringDefault(offer.type, ''),
    description: toStringDefault(offer.description, ''),
    nearBy: [],
    review: [],
  };
};

//
// export const adaptOfferToClient = (offer: any): Offer => {
//   const adaptedOffer = Object.assign(
//     {},
//     offer,
//     {
//       host: {
//         ...offer.host,
//         avatarUrl: offer.host.avatar_url,
//         isPro: offer.host.is_pro,
//       },
//       isFavorite: offer.is_favorite,
//       isPremium: offer.is_premium,
//       maxAdults: offer.max_adults,
//       previewImage: offer.preview_image,
//     },
//   );
//
//   delete adaptedOffer.host.avatar_url;
//   delete adaptedOffer.host.is_pro;
//   delete adaptedOffer.is_favorite;
//   delete adaptedOffer.is_premium;
//   delete adaptedOffer.max_adults;
//   delete adaptedOffer.preview_image;
//
//
//   return adaptedOffer;
// };

const makeUser = (user:unknown):Review['user']=>{
  if(!isRecord(user)){
    throw new Error('Invalid Argument user');
  }
  return {
    avatarUrl: toStringDefault(user['avatar_url'],''),
    id:toNumberDefault(user['id'],0),
    isPro: toBooleanDefault(user['is_pro'],false),
    name: toStringDefault(user['name'],''),
  };
};

export const adaptReviewToClient = (review: unknown): Review => {
  if(!isRecord(review)){
    throw new Error('invalid argument review');
  }
  const adaptedReview:Review = {
    comment: toStringDefault(review['comment'],''),
    date: toStringDefault(review['date'],''),
    id: toNumberDefault(review['id'],0),
    rating:toNumberDefault(review['rating'],0),
    user: makeUser(review['user']),
  };

  return adaptedReview;
};
