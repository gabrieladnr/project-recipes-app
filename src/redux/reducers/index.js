import { combineReducers } from 'redux';
import drinks from './drinks';
import foods from './foods';
import header from './header';

const rootReducer = combineReducers({
  foods,
  drinks,
  header,
});

export default rootReducer;
