import {Review} from '../../types/types';
import {EN_US} from '../../const';

type ReviewItemProps = {
  review: Review,
}

export function ReviewItem(props: ReviewItemProps): JSX.Element {
  const {review} = props;

  const reviewDate = new Date(review.date).toLocaleDateString(EN_US, {
    month: 'long',
    year: 'numeric',
  });

  return (
    <ul className="reviews__list">
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
          </div>
          <span className="reviews__user-name">{review.user.name}
          </span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: '80%'}}/>
              <span className="visually-hidden">{review.rating}</span>
            </div>
          </div>
          <p className="reviews__text">
            {review.comment}
          </p>
          <time className="reviews__time" dateTime={review.date}>{reviewDate}</time>
        </div>
      </li>
    </ul>
  );
}
