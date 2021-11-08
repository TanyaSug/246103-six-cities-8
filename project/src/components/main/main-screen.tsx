import  OffersCount  from './offers-count';
import { Header } from '../header/header';
import { Sorting } from '../sorting/sorting';
import  OffersList  from '../offers-list/offers-list';
import  CitiesList  from '../cities-list/cities-list';
import MainScreenMap from './main-screen-map';


function MainScreen(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
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
              <OffersCount />
              <Sorting />
              <div className="cities__places-list places__list tabs__content">
                <OffersList />
              </div>
            </section>
            <div className="cities__right-section">
              <MainScreenMap  />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
