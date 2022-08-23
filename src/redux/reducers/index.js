import { combineReducers } from 'redux';
import meals from './meals';
import drinks from './drinks';
import foods from './foods';
import cocktails from './cocktails';

const rootReducer = combineReducers({
  meals,
  foods,
  drinks,
  cocktails,
});

export default rootReducer;
