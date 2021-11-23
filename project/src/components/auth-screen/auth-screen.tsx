import {Logo} from '../logo/logo';
import {ThunkAppDispatch} from '../../types/action-types';
import {AuthData} from '../../types/types';
import {loginAction} from '../../store/api-actions';
import {connect, ConnectedProps, useDispatch} from 'react-redux';
import React, {FormEvent, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {AppRoute, LOGIN_ERROR_MESSAGE, MIN_PASSWORD_LENGTH} from '../../const';
import {A} from '../helper-co/anchor/anchor';
import {toggleActiveCity} from '../../store/action';
import {randomCity} from '../../utils';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit:(authData: AuthData) => dispatch(loginAction(authData)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function AuthScreen(props: PropsFromRedux): JSX.Element {
  const {onSubmit} = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const city = randomCity;

  const handleRandomCityClick = () => {
    dispatch(toggleActiveCity(city));
    history.push(AppRoute.Main);
  };

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
        onSuccess: () => history.push(AppRoute.Main),
        onFail: () => setErrorMessage(LOGIN_ERROR_MESSAGE),
      });
    }
  };

  const handleChange = () => setErrorMessage('');

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
            <form
              className={`login__form form ${errorMessage === ''?'':'form_error'}`}
              action=""
              method="post"
              onSubmit={handleSubmit}
              onChange={handleChange}
              title={errorMessage}
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
                  placeholder="Password, minimum 1 character and 1 digital"
                  pattern={'(?=.*\\d)(?=.*[a-zA-Z]).{2,}'}
                  minLength={MIN_PASSWORD_LENGTH}
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
              <A className="locations__item-link" onClick={handleRandomCityClick}>
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
