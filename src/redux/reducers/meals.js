import { MEALS } from '../actions/actionTypes';

const INITIAL_STATE = {
  meals: [],
};

// reducer da requisição a API de receitas de comidas
const mealsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case MEALS:
    return {
      ...state,
      meals: action.payload,
    };

  default:
    return state;
  }
};

export default mealsReducer;
