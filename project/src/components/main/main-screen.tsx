import {Header} from '../header/header';
import Sorting from '../sorting/sorting';
import  OffersList  from '../offers-list/offers-list';
import  CitiesList  from '../cities-list/cities-list';
import MainScreenMap from './main-screen-map';
import {MainEmpty} from './main-empty';
import {State} from '../../types/state';
import OffersCount from '../offers-count/offers-count';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({offersList}: State) => ({
  offersList,
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

function MainScreen(props: PropsFromRedux): JSX.Element {
  const {offersList} = props;

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
        {offersList.length === 0
          ? <MainEmpty />
          :
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
          </div>}
      </main>
    </div>
  );
}

export default connector(MainScreen);
