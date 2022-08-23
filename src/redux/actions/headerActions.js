import { BUTTON_TOGGLE, FILTERED_DRINKS, FILTERED_FOODS } from './actionTypes';

export const searchButtonToggle = () => ({
  type: BUTTON_TOGGLE,
});

export const actionFilterDrinks = (drinks) => ({
  type: FILTERED_DRINKS,
  payload: drinks,
});

export const actionFilterFoods = (foods) => ({
  type: FILTERED_FOODS,
  payload: foods,
});
