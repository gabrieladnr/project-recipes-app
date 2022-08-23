import { FILTERED_FOODS } from '../actions/actionTypes';

const initialState = {
  filteredFoods: {
    meals: [],
  },
};

const foods = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
  case FILTERED_FOODS:
    return {
      ...state,
      filteredFoods: {
        // testando se o array existe ou se a requisição retorna vazia. Caso a requisição voltar vazia, devolvemos um array vazio
        // Retorno quando não houver produtos: { meals: null } <- NÃO É UM ARRAY!!!
        meals: (!payload.meals?.length) ? [] : [...payload.meals],
      },
    };
  default:
    return {
      ...state,
    };
  }
};

export default foods;
