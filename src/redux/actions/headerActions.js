import { FILTERED_DRINKS, FILTERED_FOODS } from './actionTypes';

export const actionFilterDrinks = (drinks) => ({
  type: FILTERED_DRINKS,
  payload: drinks,
});

export const actionFilterFoods = (foods) => ({
  type: FILTERED_FOODS,
  payload: foods,
});
