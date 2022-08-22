import { MEALS } from './actionTypes';

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

// export placeholder pq estava dando erro
export function login() {}
