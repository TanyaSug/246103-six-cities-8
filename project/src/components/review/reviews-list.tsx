import {ReviewItem} from './review-item';
import {Review} from '../../types/types';
import {sortReviews} from '../../utils';
import {REVIEW_COUNT} from '../../const';

type ReviewsListProps = {
  reviews: Review[],
}

export function ReviewsList(props: ReviewsListProps): JSX.Element {
  const {reviews} = props;
  return (
    <>
      {
        [...reviews]
          .sort(sortReviews)
          .slice(0, REVIEW_COUNT)
          .map((review) => <ReviewItem review={review} key={review.id}/>)
      }
    </>
  );
}
