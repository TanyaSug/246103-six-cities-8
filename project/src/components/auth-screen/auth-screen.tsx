import {Logo} from '../logo/logo';
import {ThunkAppDispatch} from '../../types/action-types';
import {AuthData} from '../../types/types';
import {loginAction} from '../../store/api-actions';
import {connect, ConnectedProps} from 'react-redux';
import {FormEvent, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {AppRoute} from '../../const';
import {A} from '../helper-co/anchor/anchor';
import {toggleActiveCity} from '../../store/action';
import {randomCity} from '../../utils';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit:(authData: AuthData) => dispatch(loginAction(authData)),
  onClick: (city: string) =>  dispatch(toggleActiveCity(city)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function AuthScreen(props: PropsFromRedux): JSX.Element {
  const {onSubmit, onClick} = props;
  const city = randomCity;

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const history = useHistory();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
    history.push(AppRoute.Main);
  };
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form"
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input"
                  ref={loginRef}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input"
                  ref={passwordRef}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <A className="locations__item-link" href="#" onClick={() => onClick(city)}>
                <span>{city}</span>
              </A>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default connector(AuthScreen);
