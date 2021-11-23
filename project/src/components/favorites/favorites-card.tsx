import {AltText, FavoriteStatus, OfferType} from '../../const';
import {Offer} from '../../types/types';
import {ThunkAppDispatch} from '../../types/action-types';
import {connect, ConnectedProps} from 'react-redux';
import {changeFavoritesAction} from '../../store/api-actions';
import {getRating} from '../../utils';

type FavoritesCardProps = {
  offer: Offer,
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onStatusChange:(offerId: number, status: number) => dispatch(changeFavoritesAction(offerId, status)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & FavoritesCardProps;

function FavoriteCard(props: ConnectedComponentProps): JSX.Element {
  const {offer, onStatusChange} = props;

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href={`offers/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110"
            alt={AltText.PlaceImg}
          />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price} </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
            onClick={() => {onStatusChange(offer.id, offer.isFavorite  ? FavoriteStatus.NotFavorite : FavoriteStatus.Favorite);
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRating(offer.rating)}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">{offer.title}</h2>
        <p className="place-card__type">{OfferType[offer.type]}</p>
      </div>
    </article>
  );
}

export default connector(FavoriteCard);
