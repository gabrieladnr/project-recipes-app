import { FILTERED_DRINKS } from '../actions/actionTypes';

const initialState = {
  filteredDrinks: {
    drinks: [],
  },
};

const drinks = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
  case FILTERED_DRINKS:
    return {
      ...state,
      // testando se o array existe ou se a requisição retorna vazia. Caso a requisição voltar vazia, devolvemos um array vazio
      // Retorno quando não houver produtos: { drinks: null } <- NÃO É UM ARRAY!!!
      filteredDrinks: {
        drinks: (!payload.drinks?.length) ? [] : [...payload.drinks],
      },
    };
  default:
    return {
      ...state,
    };
  }
};

export default drinks;
