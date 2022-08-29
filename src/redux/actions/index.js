import { MEALS,
  COCKTAILS, COCKTAILS_CATEGORIES,
  MEALS_CATEGORIES, RECIPES_MEALS, RECIPES_DRINKS } from './actionTypes';

// action type API de todas as receitas de comidas
const mealAction = (meals) => ({
  type: MEALS,
  payload: meals,
});

// action fetch API de todas as receitas de comidas
export default function fetchMeals() {
  return (dispatch) => fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((mealResponse) => {
      const { meals } = mealResponse;
      return dispatch(mealAction(meals));
    });
}

// action type API de todas as receitas de bebidas
const cocktailsAction = (drinks) => ({
  type: COCKTAILS,
  payload: drinks,
});

// action fetch API de todas as receitas de bebidas
export function fetchCocktails() {
  return (dispatch) => fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((cocktailsResponse) => {
      const { drinks } = cocktailsResponse;
      return dispatch(cocktailsAction(drinks));
    });
}

// action type API de categorias de bebidas
const cocktailsCategoryAction = (drinkCategories) => ({
  type: COCKTAILS_CATEGORIES,
  payload: drinkCategories,
});

// action fetch API de categorias de bebidas
export function fetchCocktailsCategory() {
  return (dispatch) => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((categoriesResponse) => {
      const { drinks } = categoriesResponse;
      return dispatch(cocktailsCategoryAction(drinks));
    });
}

// action type API de categorias de comidas
const mealsMealsAction = (mealsCategories) => ({
  type: MEALS_CATEGORIES,
  payload: mealsCategories,
});

// action fetch API de categorias de comidas
export function fetchMealsCategory() {
  return (dispatch) => fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((categoriesResponse) => {
      const { meals } = categoriesResponse;
      return dispatch(mealsMealsAction(meals));
    });
}

const recipeMeals = (recipes) => ({
  type: RECIPES_MEALS,
  payload: recipes,
});

export function getRecipeMeals(id) {
  return (dispatch) => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((result) => result.json())
    .then((responseJSON) => dispatch(recipeMeals(responseJSON)));
}

const recipeDrinks = (recipes) => ({
  type: RECIPES_DRINKS,
  payload: recipes,
});

export function getRecipeDrinks(id) {
  return (dispatch) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((responseJSON) => dispatch(recipeDrinks(responseJSON)));
}

// export placeholder pq estava dando erro
export function login() {}
