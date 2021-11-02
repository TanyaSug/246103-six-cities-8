import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import MainScreen from '../main/main-screen';
import {AppRoute, AuthorizationStatus} from '../../const';
import { Favorites } from '../favorites/favotites';
import { OfferDetails } from '../offer-details/offer-details';
import  AuthScreen  from '../auth-screen/auth-screen';
import { NotFoundScreen } from '../not-found-screen/not-found-screen';
import  PrivateRoute  from '../private-route/private-route';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import LoadingScreen from '../loading-screen/loading-screen';
import browserHistory from '../../browser-history';

// import {offers} from '../../mocks/offers';

// type AppProps = Data;
export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

const mapStateToProps = ({authorizationStatus, isDataLoading, offersList, reviews, activeCity}: State) => ({
  authorizationStatus,
  isDataLoading,
  offersList,
  reviews,
  activeCity,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const {authorizationStatus, isDataLoading, offersList, reviews} = props;
  // const offer = offersList.map((hotel) => hotel.id);
  if (!isCheckedAuth(authorizationStatus) || isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen />
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <AuthScreen />
        </Route>
        <Route exact path={AppRoute.OfferDetails}>
          <OfferDetails offersList={offersList} reviews={reviews} />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites offers={offersList.filter((offer) => offer.isFavorite)}/>}
        >
        </PrivateRoute>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default connector(App);
