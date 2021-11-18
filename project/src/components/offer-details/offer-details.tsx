import Map from '../map/map';
import  NearOffersList  from '../near-offers-list/near-offers-list';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {Header} from '../header/header';
import {useHistory} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, MAX_IMAGES} from '../../const';
import {useEffect} from 'react';
import {ThunkAppDispatch} from '../../types/action-types';
import {changeFavoritesAction, getNearByOffersAction, getReviewsAction} from '../../store/api-actions';
import ReviewComponent from '../review/review-component';
import {getRating} from '../../utils';
// import OfferDetailsMap from '../offer-details/offer-details-map';


const mapStateToProps = ({offersList, userInfo}: State) => ({
  offersList,
  userInfo,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  getNearByOffers: (offerId: number) =>  dispatch(getNearByOffersAction(offerId)),
  getReviews: (offerId: number) =>  dispatch(getReviewsAction(offerId)),
  onFavoriteStatusChange:(offerId: number, status: number) => dispatch(changeFavoritesAction(offerId, status)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ALT_TEXT = 'Photo studio';

function OfferDetails(props: PropsFromRedux): JSX.Element {
  const {offersList, getNearByOffers, getReviews, onFavoriteStatusChange, userInfo} = props;

  const history = useHistory();
  const id = history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1);


  useEffect(() => {
    getNearByOffers(+id);
    getReviews(+id);

  } ,[getNearByOffers,getReviews,id]);

  const offer = offersList.find((off) => off.id === +id);
  const imgList = offer?.images ?? [];
  const images = imgList.slice(0, MAX_IMAGES).map((image, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div className="property__image-wrapper" key={`${image}-${index}`}>
      <img className="property__image" src={image} alt={ALT_TEXT} />
    </div>
  ));
  const goodList = offer?.goods ?? [];
  const goods = goodList.map((good, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li key={`${good}-${index}`} className="property__inside-item">
      {good}
    </li>
  ));

  if (!offer) {
    return <div>There is no information</div>;
  }

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium && <div className="property__mark"><span>Premium</span></div> }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button
                  className={`property__bookmark-button ${offer.isFavorite ? 'property__bookmark-button--active' : ''} button`}
                  type="button"
                  onClick={() => {
                    userInfo.authorizationStatus === AuthorizationStatus.Auth
                      ?
                      onFavoriteStatusChange(offer.id, offer.isFavorite  ? 0 : 1)
                      :
                      history.push(AppRoute.SignIn);
                  }}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getRating(offer.rating)}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
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
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro &&
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
                <ReviewComponent />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map offersList={offer.nearBy ?? []} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <NearOffersList />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default connector(OfferDetails);
