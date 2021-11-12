import {ALT_TEXT, AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {Offer} from '../../types/types';
import {ThunkAppDispatch} from '../../types/action-types';
import {connect, ConnectedProps} from 'react-redux';
import {changeFavoritesAction} from '../../store/api-actions';

type FavoritesCardProps = {
  offer: Offer,
}
// const mapStateToProps = ({offersList, userInfo}: State) => ({
//   offersList,
// });

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
            alt={ALT_TEXT}
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
            onClick={() => {onStatusChange(offer.id, offer.isFavorite  ? 0 : 1);
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
            <span style={{width: '100%'}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link  to={AppRoute.OfferDetails}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default connector(FavoriteCard);
