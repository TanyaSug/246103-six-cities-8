import {combineReducers} from 'redux';
import {offerData} from './data/data';
import {userProcess} from './user/user';
import {placeProcess} from './places/places';

export enum NameSpace {
  Data = 'data',
  Places = 'place',
  User = 'user',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: offerData,
  [NameSpace.Places]: placeProcess,
  [NameSpace.User]: userProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
