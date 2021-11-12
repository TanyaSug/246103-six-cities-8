import {State} from '../../types/state';
import {ThunkAppDispatch} from '../../types/action-types';
import {getReviewsAction, sendOfferReview} from '../../store/api-actions';
import {connect, ConnectedProps} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useEffect} from 'react';
import {ReviewsList} from './reviews-list';
import {CommentForm} from '../comment-form/comment-form';
import {ReviewData} from '../../types/types';
import {AuthorizationStatus} from '../../const';

const mapStateToProps = ({offersList, userInfo}: State) => ({
  offersList,
  userInfo,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  getReviews: (offerId: number) =>  dispatch(getReviewsAction(offerId)),
  onSubmit:(offerId: number, {rating, comment}: ReviewData) => dispatch(sendOfferReview(offerId, {rating, comment})),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;


function ReviewComponent(props: PropsFromRedux): JSX.Element {
  const {offersList, userInfo, getReviews, onSubmit} = props;
  const history = useHistory();
  const id = history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1);


  useEffect(() => {
    getReviews(+id);

  }, []);

  const offer = offersList.find((off) => off.id === +id);
  const reviewsCount = offer?.review.length;
  // eslint-disable-next-line no-console
  console.log(reviewsCount);
  const handleOnSubmit = (rating: number, comment: string) => {
    if (offer) {
      onSubmit(
        offer.id,
        {
          rating,
          comment,
        });
    }
  };


  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsCount}</span></h2>
      <ReviewsList reviews={offer?.review ?? []} />
      {userInfo.authorizationStatus === AuthorizationStatus.Auth ?
        <CommentForm onSubmit={handleOnSubmit}/>
        : ''}
    </>
  );
}

export default connector(ReviewComponent);
