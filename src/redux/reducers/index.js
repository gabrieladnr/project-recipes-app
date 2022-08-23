import { combineReducers } from 'redux';
import meals from './meals';
import drinks from './drinks';
import foods from './foods';
import cocktails from './cocktails';
import header from './header';

const rootReducer = combineReducers({
  meals,
  foods,
  drinks,
  cocktails,
  header,
});

export default rootReducer;
