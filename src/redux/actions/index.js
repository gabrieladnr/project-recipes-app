import { MEALS, COCKTAILS, COCKTAILS_CATEGORIES } from './actionTypes';

// action type API de receitas de comidas
const mealAction = (meals) => ({
  type: MEALS,
  payload: meals,
});

// action fetch API de receitas de comidas
export default function fetchMeals() {
  return (dispatch) => fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((mealResponse) => {
      const { meals } = mealResponse;
      return dispatch(mealAction(meals));
    });
}

// action type API de receitas de bebidas
const cocktailsAction = (drinks) => ({
  type: COCKTAILS,
  payload: drinks,
});

// action fetch API de receitas de bebidas
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

// export placeholder pq estava dando erro
export function login() {}
