import { COCKTAILS, COCKTAILS_CATEGORIES, FILTERED_DRINKS } from '../actions/actionTypes';

const INITIAL_STATE = {
  cocktails: [],
  cocktailCategories: [],
};

// reducer da requisição a API de receitas de comidas
const cocktailsReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
  case COCKTAILS:
    return {
      ...state,
      cocktails: payload,
    };
  case COCKTAILS_CATEGORIES:
    return {
      ...state,
      cocktailCategories: payload,
    };
  case FILTERED_DRINKS:
    return {
      ...state,
      // testando se o array existe ou se a requisição retorna vazia. Caso a requisição voltar vazia, devolvemos um array vazio
      // Retorno quando não houver produtos: { drinks: null } <- NÃO É UM ARRAY!!!
      cocktails: (!payload.drinks?.length) ? [] : [...payload.drinks],
    };
  default:
    return state;
  }
};

export default cocktailsReducer;
