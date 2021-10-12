import {ChangeEvent, useState} from 'react';
import {Titles} from '../../const';
import { RatingField } from './rating-field';

const values = ['1', '2', '3', '4', '5'];

export function CommentForm (): JSX.Element {

  const [ratingValue, setRatingValue] = useState<string | undefined>(undefined);
  const [reviewValue, setReviewValue] = useState<string>('');

  const handleFormRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRatingValue(evt.target.value);
  };

  const handleFormTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewValue(evt.target.value);
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">{Titles.YourReview }</label>
      <div className="reviews__rating-form form__rating" onChange={handleFormRatingChange}>
        {values.map((value) => <RatingField value={value} checked={ratingValue === value} key={value} />)}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewValue}
        onChange={handleFormTextareaChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}
