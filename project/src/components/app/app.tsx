import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainScreen from '../main/main-screen';
// import {Data} from '../../index';
import {AppRoute, AuthorizationStatus} from '../../const';
import { Favorites } from '../favorites/favotites';
import { OfferDetails } from '../offer-details/offer-details';
import { SignIn } from '../sign-in/sign-in';
import { NotFoundScreen } from '../not-found-screen/not-found-screen';
import { PrivateRoute } from '../private-route/private-route';
import {offers} from '../../mocks/offers';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import LoadingScreen from '../loading-screen/loading-screen';
// import browserHistory from '../../browser-history';

// type AppProps = Data;

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
  const {isDataLoading} = props;
  if (isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen />
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignIn />
        </Route>
        <Route exact path={AppRoute.OfferDetails}>
          <OfferDetails reviews={props.reviews} offers={offers}  />
        </Route>
        <PrivateRoute exact path={AppRoute.Favorites}
          render={() => <Favorites offers={props.offersList.filter((offer) => offer.isFavorite)}/>}
          authorizationStatus={AuthorizationStatus.Auth}
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
