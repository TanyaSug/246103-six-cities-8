import {Link, useHistory} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, SIGN_IN, SIGN_OUT} from '../../const';
import {State} from '../../types/state';
import {requireLogout} from '../../store/action';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';
import {Action} from '../../types/action-types';


const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  handleUserLogoutClick:() =>  dispatch(requireLogout()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function UserBox(props: PropsFromRedux): JSX.Element {
  const {handleUserLogoutClick, authorizationStatus} = props;
  const history = useHistory();
  return (
    <nav className="header__nav" data-testid="header-nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          {authorizationStatus === AuthorizationStatus.Auth ?
            <>
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Favorites}>
                <span className="header__user-name user__name">{}</span>
              </Link>
              <span onClick={() => {
                handleUserLogoutClick();
                history.push(AppRoute.Main);
              }}
              >{SIGN_OUT}
              </span>
            </>
            : <span onClick={() => history.push(AppRoute.SignIn)} className="header__login">{SIGN_IN}</span>}
        </li>
      </ul>
    </nav>
  );
}

export default connector(UserBox);
