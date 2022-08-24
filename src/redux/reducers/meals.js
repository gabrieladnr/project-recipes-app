import { FILTERED_FOODS, MEALS, MEALS_CATEGORIES } from '../actions/actionTypes';

const INITIAL_STATE = {
  meals: [],
  mealsCategories: [],
};

// reducer das requisições a APIs comidas
const mealsReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
  case MEALS:
    return {
      ...state,
      meals: payload,
    };
  case MEALS_CATEGORIES:
    return {
      ...state,
      mealsCategories: payload,
    };
  case FILTERED_FOODS:
    return {
      ...state,
      meals: (!payload.meals?.length) ? [] : [...payload.meals],
    };
  default:
    return state;
  }
};

export default mealsReducer;
