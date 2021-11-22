import {ChangeEvent, FormEvent, useState} from 'react';
import {MIN_LENGTH_REVIEW, Titles, RATING_VALUES, MAX_LENGTH_REVIEW} from '../../const';
import { RatingField } from './rating-field';

export type CommentFormProp = {
  onSubmit: (
    rating: number,
    comment: string,
    setErrorValue: (message: string) => void,
    setSubmittingFlag: (flag: boolean) => void,
    resetForm: () => void,
  ) => void;
}
// const REVIEW_ERROR_MESSAGE = 'You have an error';

export function ReviewForm (props: CommentFormProp): JSX.Element {
  const {onSubmit} = props;

  const [ratingValue, setRatingValue] = useState<string>('');
  const [reviewValue, setReviewValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submittingFlag, setSubmittingFlag] = useState<boolean>(false);

  const handleFormRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRatingValue(evt.target.value);
  };

  const handleFormTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewValue(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (errorMessage) {
      setErrorMessage('');
    }
    onSubmit(
      +ratingValue,
      reviewValue,
      setErrorMessage,
      setSubmittingFlag,
      () => {
        setRatingValue('');
        setReviewValue('');
      },
    );
  };

  const handleChange = () => setErrorMessage('');

  return (
    <form
      className={`reviews__form form ${errorMessage === '' ? '' : 'form_error'}`}
      action="#"
      method="post"
      onSubmit={handleSubmit}
      onChange={handleChange}
      title={errorMessage}
    >
      <label className="reviews__label form__label" htmlFor="review">{Titles.YourReview }</label>
      <div className="reviews__rating-form form__rating">
        {RATING_VALUES.map((value) => <RatingField onChange={handleFormRatingChange} value={value} checked={ratingValue === value} disabled={submittingFlag} key={value} />)}
      </div>
      <textarea
        disabled={submittingFlag}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        maxLength={MAX_LENGTH_REVIEW}
        value={reviewValue}
        onChange={handleFormTextareaChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        {errorMessage.length > 0 &&
          <b className="reviews__help"
            style={{color: 'red'}}
          >
            {errorMessage}
          </b>}
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={
          !((reviewValue.length > MIN_LENGTH_REVIEW) && ratingValue)
        }
        >Submit
        </button>
      </div>
    </form>
  );
}


