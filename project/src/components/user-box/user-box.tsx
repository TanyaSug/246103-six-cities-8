import {Link, useHistory} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, SIGN_IN, SIGN_OUT} from '../../const';
import {State} from '../../types/state';
// import {requireLogout} from '../../store/action';
import {connect, ConnectedProps} from 'react-redux';
// import {Dispatch} from 'redux';
import {ThunkAppDispatch} from '../../types/action-types';
import {logoutAction} from '../../store/api-actions';
import {A} from '../helper-co/anchor/anchor';


const mapStateToProps = ({userInfo}: State) => ({
  userInfo,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onUserLogoutClick:() =>  dispatch(logoutAction()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function UserBox(props: PropsFromRedux): JSX.Element {
  const {onUserLogoutClick, userInfo} = props;
  const history = useHistory();
  return (
    <nav className="header__nav" data-testid="header-nav">
      <ul className="header__nav-list">
        {userInfo.authorizationStatus === AuthorizationStatus.Auth
          ?
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{userInfo.authEmail}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <A className="header__nav-link" href="#">
                <span onClick={() => {
                  onUserLogoutClick();
                  history.push(AppRoute.Main);
                }}
                > {SIGN_OUT}
                </span>
              </A>
            </li>
          </>
          :
          <li className="header__nav-item">
            <span onClick={() => history.push(AppRoute.SignIn)} className="header__login">{SIGN_IN}</span>
          </li>}
      </ul>
    </nav>
  );
}

export default connector(UserBox);
