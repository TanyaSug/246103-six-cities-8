import {AppRoute, AuthorizationStatus, OfferType} from '../../const';
import {Link, generatePath, useHistory} from 'react-router-dom';
import {ThunkAppDispatch} from '../../types/action-types';
import {setActiveCard} from '../../store/action';
import {connect, ConnectedProps} from 'react-redux';
import {Offer} from '../../types/types';
import {changeFavoritesAction} from '../../store/api-actions';
import {A} from '../helper-co/anchor/anchor';
import {State} from '../../types/state';
import {getRating} from '../../utils';

type PlaceCardProps = {
  offer: Offer,
  isMainScreen?: boolean,
}

const mapStateToProps = ({userInfo}: State) => ({
  userInfo,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  setActive: (cardInfo: number | undefined) =>  dispatch(setActiveCard(cardInfo)),
  onFavoriteStatusChange:(offerId: number, status: number) => dispatch(changeFavoritesAction(offerId, status)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PlaceCardProps;

function PlaceCard(props: ConnectedComponentProps): JSX.Element {
  const {offer, setActive, isMainScreen, onFavoriteStatusChange, userInfo} = props;
  const history = useHistory();

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={() => {
        isMainScreen && setActive(offer.id);
      }}
      onMouseLeave={() => {
        isMainScreen && setActive(undefined);
      }}
    >
      {offer.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <A href="#">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt={offer.description}/>
        </A>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price} </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={() => {
              userInfo.authorizationStatus === AuthorizationStatus.Auth
                ?
                onFavoriteStatusChange(offer.id, offer.isFavorite ? 0 : 1)
                :
                history.push(AppRoute.SignIn);
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRating(offer.rating)}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" >
          <Link to={generatePath(AppRoute.OfferDetails, {id: offer.id})}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{OfferType[offer.type]}</p>
      </div>
    </article>
  );
}

export default connector(PlaceCard);
