import { combineReducers } from 'redux';
import meals from './meals';
import drinks from './drinks';
import cocktails from './cocktails';
import header from './header';

const rootReducer = combineReducers({
  meals,
  drinks,
  cocktails,
  header,
});

export default rootReducer;
