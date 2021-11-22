import {User} from '../../types/state-new';
import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorization, requireLogout} from '../action-new';
import {AuthorizationStatus} from '../../const';


const initialState: User = {
  userInfo: {
    authorizationStatus: AuthorizationStatus.Unknown,
  },
  isDataLoading: false,
};

const userProcess = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization,(state, action) => {
    state.userInfo = action.payload.userInfo;
    state.isDataLoading = action.payload.loading ?? false;
  });
  builder.addCase(requireLogout,(state, action) => {
    state.userInfo = {authorizationStatus: AuthorizationStatus.NoAuth};
  });
});

export {userProcess};
