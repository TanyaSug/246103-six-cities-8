// import {Titles} from '../../const';
// import { FavoriteCard } from './favorites-card';
// import {Offer, ReviewData} from '../../types/types';
import {Header} from '../header/header';
import {A} from '../helper-co/anchor/anchor';
// import FavoritesList from './favorites-list';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import FavoritesList from './favorites-list';
// import {State} from '../../types/state';
// import {ThunkAppDispatch} from '../../types/action-types';
// import {getFavoritesAction} from '../../store/api-actions';
// import {connect, ConnectedProps} from 'react-redux';
// import {useEffect} from 'react';


// type FavoritesProps = {
//   offers: Offer[],
// }
//
const mapStateToProps = ({favoritesList}: State) => ({
  favoritesList,
});
//
// const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
//   getFavorites: () =>  dispatch(getFavoritesAction()),
// });
//
const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

function Favorites(props: PropsFromRedux): JSX.Element {
  const {favoritesList} = props;
  // eslint-disable-next-line no-console
  console.log(favoritesList);
  //
  // useEffect(() => {
  //   getFavorites();
  //
  // }, []);
  // const favoriteCities = Array.from(new Set(favoritesList.map((offer) => offer.city.name)));
  return (
    <div className={`page ${favoritesList.length > 0 ? '' : 'page page--favorites-empty'}`}>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <FavoritesList />
        </div>
      </main>
      <footer className="footer container">
        <A className="footer__logo-link" href="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </A>
      </footer>
    </div>
  );
}

export default connector(Favorites);
