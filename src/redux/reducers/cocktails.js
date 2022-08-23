import { COCKTAILS, COCKTAILS_CATEGORIES } from '../actions/actionTypes';

const INITIAL_STATE = {
  cocktails: [],
  cocktailCategories: [],
};

// reducer da requisição a API de receitas de comidas
const cocktailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case COCKTAILS:
    return {
      ...state,
      cocktails: action.payload,
    };
  case COCKTAILS_CATEGORIES:
    return {
      ...state,
      cocktailCategories: action.payload,
    };

  default:
    return state;
  }
};

export default cocktailsReducer;
