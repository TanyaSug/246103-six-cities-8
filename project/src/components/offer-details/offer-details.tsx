import { CommentForm } from '../comment-form/comment-form';
import {ReviewsList} from '../review/reviews-list';
import Map from '../map/map';
import { NearOffersList } from '../near-offers-list/near-offers-list';
// import {Review} from '../../types/types';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {Header} from '../header/header';
import {useHistory} from 'react-router-dom';
import {MAX_IMAGES} from '../../const';
import {useEffect} from 'react';
// import {Dispatch} from 'redux';
import {ThunkAppDispatch} from '../../types/action-types';
// import {setActiveCard, updateOffer} from '../../store/action';
import {getNearByOffersAction} from '../../store/api-actions';


const mapStateToProps = ({offersList, reviews}: State) => ({
  offersList,
  reviews,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  getNearByOffers: (offerId: number) =>  dispatch(getNearByOffersAction(offerId)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export function OfferDetails(props: PropsFromRedux): JSX.Element {
  const {offersList, reviews, getNearByOffers} = props;

  const history = useHistory();
  const id = history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1);


  useEffect(() => {
    getNearByOffers(+id);

  } ,[]);

  const offer = offersList.find((off) => off.id === +id);
  const imgList = offer?.images;
  const images = imgList?.slice(0, MAX_IMAGES).map((image, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div className="property__image-wrapper" key={`${image}-${index}`}>
      <img className="property__image" src={image} alt="Photo studio" />
    </div>
  ));
  const goodList = offer?.goods;
  const goods = goodList?.map((good, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li key={`${good}-${index}`} className="property__inside-item">
      {good}
    </li>
  ));

  // eslint-disable-next-line no-console
  console.log(offer);
  return (
    <div className="page">
      < Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer?.isPremium && <div className="property__mark"><span>Premium</span></div> }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer?.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: '80%'}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer?.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer?.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer?.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer?.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer?.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={offer?.host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {offer?.host.name}
                  </span>
                  {offer?.host.isPro &&
                    <span className="property__user-status">
                    Pro
                    </span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer?.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount"></span></h2>
                <ReviewsList reviews={reviews} />
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map offersList={offer?.nearBy ?? []} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <NearOffersList offersList={offer?.nearBy ?? []} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default connector(OfferDetails);
