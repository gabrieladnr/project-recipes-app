import { COCKTAILS } from '../actions/actionTypes';

const INITIAL_STATE = {
  cocktails: [],
};

// reducer da requisição a API de receitas de comidas
const cocktailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case COCKTAILS:
    return {
      ...state,
      cocktails: action.payload,
    };

  default:
    return state;
  }
};

export default cocktailsReducer;
