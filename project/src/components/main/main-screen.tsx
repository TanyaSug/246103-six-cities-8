import { OffersCount } from './offers-count';
import {Offer} from '../../index';
import { Logo } from '../logo/logo';
import { OffersList } from '../offers-list/offers-list';
import {AppRoute} from '../../const';
import { Link } from 'react-router-dom';
// import { CITY} from '../../mocks/city';
import { CitiesList } from '../cities-list/cities-list';
import {Map} from '../map/map';
// import {CITY} from '../../mocks/city';
import {City} from '../../types/types';

type MainScreenProps = {
  offers: Offer[],
  city: City;
}

function MainScreen(props: MainScreenProps): JSX.Element {
  const {offers, city} = props;
  // const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(
  //   undefined,
  // );

  // const onListItemHover = (listItemName: string) => {
  //   const currentPoint = points.find((point) => point.title === listItemName);
  //
  //   setSelectedPoint(currentPoint);
  // };
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <Link className="header__user-name user__name" to={AppRoute.Favorites}>
                      Oliver.conner@gmail.com
                    </Link>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <OffersCount offersQuantity={offers.length}/>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by </span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"/>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OffersList offers={offers}/>
              </div>
            </section>
            <div className="cities__right-section">
              <Map city={city} points={offers.map((offer) => offer.location)} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
