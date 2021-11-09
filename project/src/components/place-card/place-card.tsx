import {AppRoute} from '../../const';
import { Link, generatePath } from 'react-router-dom';
import {Dispatch} from 'redux';
import {Action} from '../../types/action-types';
import {setActiveCard} from '../../store/action';
import {connect, ConnectedProps} from 'react-redux';
import {Offer} from '../../types/types';

type PlaceCardProps = {
  offer: Offer,
  isMainScreen?: boolean,
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setActive: (cardInfo: number | undefined) =>  dispatch(setActiveCard(cardInfo)),
});
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PlaceCardProps;

function PlaceCard(props: ConnectedComponentProps): JSX.Element {
  const {offer, setActive, isMainScreen} = props;

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
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price} </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}  type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80%'}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" >
          <Link to={generatePath(AppRoute.OfferDetails, {id: offer.id})}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default connector(PlaceCard);
