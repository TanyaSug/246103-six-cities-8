import {Offer} from '../types/types';


export const adaptOfferToClient = (offer: any): Offer => {
  const adaptedOffer = Object.assign(
    {},
    offer,
    {
      host: {
        ...offer.host,
        avatarUrl: offer.host.avatar_url,
        isPro: offer.host.is_pro,
      },
      isFavorite: offer.is_favorite,
      isPremium: offer.is_premium,
      maxAdults: offer.max_adults,
      previewImage: offer.preview_image,
    },
  );

  delete adaptedOffer.host.avatar_url;
  delete adaptedOffer.host.is_pro;
  delete adaptedOffer.is_favorite;
  delete adaptedOffer.is_premium;
  delete adaptedOffer.max_adults;
  delete adaptedOffer.preview_image;


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
