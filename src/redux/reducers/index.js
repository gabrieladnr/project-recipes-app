import { combineReducers } from 'redux';
import meals from './meals';
import cocktails from './cocktails';
import header from './header';

const rootReducer = combineReducers({
  meals,
  cocktails,
  header,
});

export default rootReducer;
