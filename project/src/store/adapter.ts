import { City, Host, Offer } from '../types/types';

const nullHost: Host = {
  avatarUrl: '',
  hostId: 0,
  hostName: '',
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
      hostName: toStringDefault(host['host_name'], ''),
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
  const adaptedOffer: Offer = {
    host: adaptHost(offer.host),
    isFavorite: toBooleanDefault(offer.is_favorite, false),
    isPremium: toBooleanDefault(offer.is_premium, false),
    maxAdults: toNumberDefault(offer.max_adults, 0),
    previewImage: toStringDefault(offer.preview_image, ''),
    id:toNumberDefault(offer.id,0),
    bedrooms:toNumberDefault(offer.bedrooms,0),
    city:toCityExact(offer.city),
    goods:toStringArray(offer.goods),
    images:toStringArray(offer.images),
    location:toLocationExact(offer.location),
    price:toNumberDefault(offer.price,0),
    rating:toNumberDefault(offer.rating,0),
    title:toStringDefault(offer.title,''),
    type:toStringDefault(offer.type,''),
  };


  return adaptedOffer;
};

// export const adaptReviewToClient = (data) => {
//   const adaptedReview = {
//     ...data,
//     user: {
//       ...data.user,
//       avatarUrl: data.user.avatar_url,
//       isPro: data.user.is_pro,
//     },
//   };
//
//   delete adaptedReview.user.avatar_url;
//   delete adaptedReview.user.is_pro;
//
//   return adaptedReview;
// };
