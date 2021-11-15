import {A} from '../helper-co/anchor/anchor';
import FavoriteCard from './favorites-card';
import {State} from '../../types/state';
import {ThunkAppDispatch} from '../../types/action-types';
import {getFavoritesAction} from '../../store/api-actions';
import {connect, ConnectedProps} from 'react-redux';
import {useEffect} from 'react';
// import {Offer} from '../../types/types';
import {Titles} from '../../const';
import {FavoritesEmpty} from './favorites-empty';

const mapStateToProps = ({favoritesList}: State) => ({
  favoritesList,
});
// type FavoritesListProps = {
//   offers: Offer[],
//   city: string,
// }

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  getFavorites: () =>  dispatch(getFavoritesAction()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
// type ConnectedComponentProps = PropsFromRedux & FavoritesListProps;

function FavoritesList(props: PropsFromRedux): JSX.Element {
  const {getFavorites, favoritesList} = props;
  const favoriteCities = Array.from(new Set(favoritesList.map((offer) => offer.city.name)));

  useEffect(() => {
    getFavorites();

  }, [getFavorites]);

  return (
    favoritesList.length > 0 ?
      <section className="favorites">
        <h1 className="favorites__title">{Titles.FavoriteTitle}</h1>
        <ul className="favorites__list">
          {favoriteCities.map((city, index) => {
            const favoriteCityOffers = favoritesList.filter((place) => place.city.name === city);
            return (
              <li className="favorites__locations-items" key={city}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <A className="locations__item-link" href="#">
                      <span>{city}</span>
                    </A>
                  </div>
                </div>
                <div className="favorites__places">
                  {favoriteCityOffers.map((offer) => <FavoriteCard offer={offer} key={offer.id}/>)}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      : <FavoritesEmpty/>
  );
}

export default connector(FavoritesList);
