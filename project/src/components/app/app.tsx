import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainScreen from '../main/main-screen';
import {Data} from '../../index';
import {AppRoute, AuthorizationStatus} from '../../const';
import { Favorites } from '../favorites/favotites';
import { OfferDetails } from '../offer-details/offer-details';
import { SignIn } from '../sign-in/sign-in';
import { NotFoundScreen } from '../not-found-screen/not-found-screen';
import { PrivateRoute } from '../private-route/private-route';

type AppProps = Data;

function App(props: AppProps): JSX.Element {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen offers={props.offers} />
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignIn />
        </Route>
        <Route exact path={AppRoute.OfferDetails}>
          <OfferDetails />
        </Route>
        <PrivateRoute exact path={AppRoute.Favorites}
          render={() => <Favorites />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
