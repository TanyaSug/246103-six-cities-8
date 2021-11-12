import {Redirect, Route, RouteProps } from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {History} from 'history';

type RenderFuncProps = {
  history: History<unknown>;
}

type PrivateRouteProps = RouteProps & {
  render: (props: RenderFuncProps) => JSX.Element;
  // authorizationStatus: AuthorizationStatus;
}

const MapStateToProps = ({userInfo}: State) => ({
  userInfo,
});

const connector = connect(MapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  const {exact, path, render, userInfo} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => (
        userInfo.authorizationStatus === AuthorizationStatus.Auth
          ? render(routeProps)
          : <Redirect to={AppRoute.SignIn}/>
      )}
    />
  );
}

// export {PrivateRoute};
export default connector(PrivateRoute);
