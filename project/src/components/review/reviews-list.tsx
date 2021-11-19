import {ReviewItem} from './review';
import {Review} from '../../types/types';
import {sortReviews} from '../../utils';
import {REVIEW_COUNT} from '../../const';

type ReviewsListProps = {
  reviews: Review[],
}

export function ReviewsList(props: ReviewsListProps): JSX.Element {
  const {reviews} = props;
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {reviews.length <= REVIEW_COUNT
        ?
        reviews
          .sort(sortReviews)
          .map((review) => <ReviewItem review={review} key={review.id}/>)
        :
        reviews
          .sort(sortReviews)
          .slice(0, REVIEW_COUNT)
          .map((review) => <ReviewItem review={review} key={review.id}/>)}
    </>
  );
}
