import {State} from '../../types/state';
import {ThunkAppDispatch} from '../../types/action-types';
import { sendOfferReview} from '../../store/api-actions';
import {connect, ConnectedProps} from 'react-redux';

import {ReviewsList} from './reviews-list';
import {ReviewForm, CommentFormProp} from '../new-review-form/review-form';
import {Offer, ReviewData} from '../../types/types';
import {AuthorizationStatus} from '../../const';

const mapStateToProps = ({offersList, userInfo}: State) => ({
  // offersList,
  userInfo,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  // getReviews: (offerId: number) =>  dispatch(getReviewsAction(offerId)),
  onSubmit:(offerId: number,
    {rating, comment}: ReviewData,
    setErrorValue: (message: string) => void,
    setSubmittingFlag: (flag: boolean) => void,
    resetForm: () => void,
  ) => dispatch(sendOfferReview(
    offerId,
    {rating, comment},
    setErrorValue,
    setSubmittingFlag,
    resetForm),
  ),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ReviewComponentProps = {
  offer: Offer;
}

function ReviewComponent(props: PropsFromRedux & ReviewComponentProps): JSX.Element {
  const {userInfo, onSubmit, offer} = props;

  // const history = useHistory();
  // const id = + history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1);
  //
  // useEffect(() => {
  //   getReviews(id);
  // }, [getReviews, id]);
  //
  // const offer = offersList.find((off) => off.id === +id);
  //
  // if (!offer) {
  //   return <div>There is no information</div>;
  // }

  const reviewsCount = offer.review.length;
  const handleOnSubmit: CommentFormProp['onSubmit'] = (
    rating: number,
    comment: string,
    setErrorValue: (message: string) => void,
    setSubmittingFlag: (flag: boolean) => void,
    resetForm: () => void,
  ) => {
    if (offer) {
      onSubmit(
        offer.id,
        {
          rating,
          comment,
        },
        setErrorValue,
        setSubmittingFlag,
        resetForm,
      );
    }
  };

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsCount}</span></h2>
      <ReviewsList reviews={offer.review ?? []} />
      {userInfo.authorizationStatus === AuthorizationStatus.Auth ?
        <ReviewForm onSubmit={handleOnSubmit}/>
        : ''}
    </>
  );
}

export default connector(ReviewComponent);
