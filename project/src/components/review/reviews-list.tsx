import {Review} from '../../index';
import { ReviewItem } from './review';

type ReviewsListProps = {
  reviews: Review[],
}

export function ReviewsList(props: ReviewsListProps): JSX.Element {
  const {reviews} = props;
  return (
    <>
      {reviews.map((review) => <ReviewItem review={review} key={review.id}/>)}
    </>
  );
}
