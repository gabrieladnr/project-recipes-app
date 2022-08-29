import { RECIPES_DRINKS, RECIPES_MEALS } from '../actions/actionTypes';

const INITIAL_STATE = {
  meals: {},
  drinks: {},
};

const recipeReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
  case RECIPES_MEALS:
    return {
      ...state,
      meals: payload,
    };
  case RECIPES_DRINKS:
    return {
      ...state,
      drinks: payload,
    };
  default:
    return state;
  }
};

export default recipeReducer;
