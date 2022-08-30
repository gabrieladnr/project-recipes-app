import { combineReducers } from 'redux';
import meals from './meals';
import cocktails from './cocktails';
import header from './header';
import recipeReducer from './recipes';

const rootReducer = combineReducers({
  meals,
  cocktails,
  header,
  recipeReducer,
});

export default rootReducer;
