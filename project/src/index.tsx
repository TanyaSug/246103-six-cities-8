import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {requireAuthorization} from './store/action';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {AuthorizationStatus} from './const';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import {ThunkAppDispatch} from './types/action-types';
import {redirect} from './store/middlewares/redirect';


const api = createAPI( () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ));
(store.dispatch as ThunkAppDispatch)(checkAuthAction());
// store.dispatch(getOffers(offers));
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

