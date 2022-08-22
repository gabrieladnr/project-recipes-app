import { FILTERED_FOODS } from '../actions/actionTypes';

const initialState = {
  filteredFoods: {
    meals: [],
  },
};

const foods = (state = initialState, action) => {
  switch (action.type) {
  case FILTERED_FOODS:
    return {
      ...state,
      filteredFoods: action.payload,
    };
  default:
    return {
      ...state,
    };
  }
};

export default foods;
