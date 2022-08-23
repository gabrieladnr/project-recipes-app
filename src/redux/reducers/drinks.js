import { FILTERED_DRINKS } from '../actions/actionTypes';

const initialState = {
  filteredDrinks: {
    drinks: [],
  },
};

const drinks = (state = initialState, action) => {
  switch (action.type) {
  case FILTERED_DRINKS:
    return {
      ...state,
      filteredDrinks: action.payload,
    };
  default:
    return {
      ...state,
    };
  }
};

export default drinks;
