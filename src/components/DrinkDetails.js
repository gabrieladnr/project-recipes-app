import React from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Share from './Share';

class DrinkDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      recomendation: [],
      favorite: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getRecipeById(id);
    this.getRecomendation();
  }

  getRecomendation = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const result = await fetch(url)
      .then((response) => response.json());
    this.setState({ recomendation: result.meals });
  }

  getRecipeById = async (id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const result = await fetch(url)
      .then((response) => response.json());
    this.setState({ recipe: result.drinks[0] });
    if (localStorage.getItem('favoriteRecipes') !== null
    && JSON.parse(localStorage.getItem('favoriteRecipes'))
      .some((item) => item.id === id)) {
      this.setState({ favorite: true });
    }
  }

  favoriteRecipe = () => {
    const { recipe, favorite } = this.state;
    const { match: { params: { id } } } = this.props;
    if (localStorage.getItem('favoriteRecipes') !== null
    && JSON.parse(localStorage.getItem('favoriteRecipes'))
      .some((item) => item.id === id)) {
      const oldFavorites = localStorage.getItem('favoriteRecipes');
      const newFavorites = JSON.parse(oldFavorites).filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const oldFavorites = (JSON.parse(localStorage.getItem('favoriteRecipes')) !== null)
        ? JSON.parse(localStorage.getItem('favoriteRecipes'))
        : null;
      const newFavorites = (oldFavorites !== null) ? [
        ...oldFavorites,
        {
          id: recipe.idDrink,
          type: 'drink',
          nationality: '',
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic,
          name: recipe.strDrink,
          image: recipe.strDrinkThumb,
        },
      ] : [
        {
          id: recipe.idDrink,
          type: 'drink',
          nationality: '',
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic,
          name: recipe.strDrink,
          image: recipe.strDrinkThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
    this.setState({ favorite: !favorite });
  }

  render() {
    const { history, match: { params: { id } } } = this.props;
    const { recipe, favorite, recomendation } = this.state;
    console.log(recomendation);
    const favoriteImg = (favorite) ? blackHeartIcon : whiteHeartIcon;
    let btn;
    if (localStorage.getItem('doneRecipes') !== null
      && JSON.parse(localStorage.getItem('doneRecipes'))
        .some((item) => item.id === id)) {
      btn = (<> </>);
    } else {
      btn = (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
        >
          {
            (localStorage.getItem('inProgressRecipes') !== null
              && Object.keys(JSON.parse(
                localStorage.getItem('inProgressRecipes'),
              ).cocktails)
                .some((item) => item === id))
              ? 'Continue Recipe' : 'Start Recipe'
          }
        </button>);
    }
    const recomendList = (recomendation.length > 0)
      ? recomendation.map((item, index) => {
        const testId = `${index}-recomendation-card`;
        const maxRecomendation = 5;
        if (index < maxRecomendation) {
          return (
            <li data-testid={ testId } key={ item.idMeal }>
              <img src={ item.strMealThumb } alt={ item.strMeal } />
              <h3>{item.strMeal}</h3>
            </li>
          );
        }
        return <> </>;
      })
      : <> </>;
    return (
      <main>
        <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
        <img
          data-testid="recipe-photo"
          src={ recipe.strDrinkThumb }
          alt={ recipe.strTags }
          tagname={ recipe.strTags }
        />
        <p data-testid="recipe-category">{ recipe.strAlcoholic }</p>
        <h3>Ingredients</h3>
        <ul>
          {
            Object.keys(recipe).filter((key) => key.includes('strIngredient'))
              .map((ingredient, index) => {
                const testid = `${index}-ingredient-name-and-measure`;
                if (recipe[ingredient] === '' || recipe[ingredient] === null) {
                  return <div key={ index }> </div>;
                }
                const measure = `strMeasure${index + 1}`;
                return (
                  <li
                    data-testid={ testid }
                    key={ index }
                  >
                    {`${recipe[measure]} ${recipe[ingredient]}`}
                  </li>
                );
              })
          }
        </ul>
        <section>
          <h3>Instructions:</h3>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
          <section>
            {
              btn
            }
            <Share
              keyused="history"
              pathname={ history.location.pathname }
              item=""
              testId="share-btn"
            />
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ () => this.favoriteRecipe() }
              src={ favoriteImg }
            >
              <img src={ favoriteImg } alt={ JSON.stringify(favorite) } />
            </button>
          </section>
          <h3>Recomendation list:</h3>
          <ul data-testid="recomendation-card">
            {
              recomendList
            }
          </ul>
        </section>
      </main>
    );
  }
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
