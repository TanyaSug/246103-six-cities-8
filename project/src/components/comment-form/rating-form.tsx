import {ChangeEvent, useState} from 'react';


export function RatingForm(): JSX.Element {

  const [reviewsRating, setReviewsRating] = useState('');
  return (
    <>
      <input
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setReviewsRating(evt.target.value);
          console.log(evt.target.value);
        }} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
      />
      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>
    </>
  );
}
