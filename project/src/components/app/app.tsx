import {Switch, Route, Router as BrowserRouter, Redirect} from 'react-router-dom';
import MainScreen from '../main/main-screen';
import {AppRoute, AuthorizationStatus} from '../../const';
import  Favorites from '../favorites/favotitesScreen';
import  OfferDetails  from '../offer-details/offer-details';
import  AuthScreen  from '../auth-screen/auth-screen';
import {NotFoundScreen} from '../not-found-screen/not-found-screen';
import  PrivateRoute  from '../private-route/private-route';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import LoadingScreen from '../loading-screen/loading-screen';
import browserHistory from '../../browser-history';


export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

const mapStateToProps = ({userInfo, isDataLoading}: State) => ({
  stillLoading: isCheckedAuth(userInfo.authorizationStatus) || isDataLoading,
  userInfo,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const {stillLoading, userInfo} = props;

  if (stillLoading) {
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
          { userInfo.authorizationStatus === AuthorizationStatus.Auth
            ?
            <Redirect to={AppRoute.Main} />
            :
            <AuthScreen />}
        </Route>
        <Route exact path={AppRoute.OfferDetails}>
          <OfferDetails />
        </Route>
        <PrivateRoute
          exact path={AppRoute.Favorites}
          render={() => <Favorites />}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Error}>
          <NotFoundScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default connector(App);
