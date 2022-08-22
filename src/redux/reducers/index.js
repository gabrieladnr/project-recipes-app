import { combineReducers } from 'redux';
import drinks from './drinks';
import foods from './foods';

const rootReducer = combineReducers({
  foods,
  drinks,
});

export default rootReducer;
