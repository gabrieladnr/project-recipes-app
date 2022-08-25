import React, { Component } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Share from './Share';

export default class FoodsInProgress extends Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      favorite: false,
      statusCheck: '',
      checked: false,
      checkedIngredients: [],
      statusDisabled: true,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    console.log(id);
    this.getRecipeById(id);
    this.maintainProgress();
  }

  maintainProgress = () => {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    this.setState({
      checkedIngredients: progress,
    });
  }

  getRecipeById = async (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const result = await fetch(url)
      .then((response) => response.json());
    this.setState({ recipe: result.meals[0] });
    if (localStorage.getItem('favoriteRecipes') !== null
    && JSON.parse(localStorage.getItem('favoriteRecipes'))
      .some((item) => item.id === id)) {
      this.setState({ favorite: true });
    }
  }

  favoriteRecipe = () => {
    const { id } = this.props;
    const { recipe, favorite } = this.state;
    // -----------------------------------------------------
    if (localStorage.getItem('favoriteRecipes') !== null
    && JSON.parse(localStorage.getItem('favoriteRecipes'))
      .some((item) => item.id === id)) {
      const oldFavorites = localStorage.getItem('favoriteRecipes');
      const newFavorites = JSON.parse(oldFavorites).filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      // -----------------------------------------------------
    } else {
      const oldFavorites = (localStorage.getItem('favoriteRecipes') !== null)
        ? JSON.parse(localStorage.getItem('favoriteRecipes'))
        : null;
      const newFavorites = (oldFavorites !== null) ? [
        ...oldFavorites,
        {
          id: recipe.idMeal,
          type: 'food',
          nationality: recipe.strArea,
          category: recipe.strCategory,
          alcoholicOrNot: '',
          name: recipe.strMeal,
          image: recipe.strMealThumb,
        },
      ] : [
        {
          id: recipe.idMeal,
          type: 'food',
          nationality: recipe.strArea,
          category: recipe.strCategory,
          alcoholicOrNot: '',
          name: recipe.strMeal,
          image: recipe.strMealThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      // -----------------------------------------------------
    }
    this.setState({ favorite: !favorite });
  }

  recipeProgress = (ingredient) => {
    const { checked, recipe, checkedIngredients } = this.state;
    if (checked === false) {
      this.setState({
        checked: true,
        statusCheck: 'checked',
        checkedIngredients: [...checkedIngredients, ingredient],
      });
    } else {
      this.setState({
        checked: false,
        statusCheck: '',
        checkedIngredients: checkedIngredients.filter((item) => item !== ingredient),
      });
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...JSON.parse(localStorage.getItem('inProgressRecipes')),
      meals: {
        [recipe.id]: checkedIngredients,
      },
    }));
  }

  finalizeRecipe = () => {
    const { recipe, checkedIngredients, statusDisabled } = this.state;
    const avaliableIngrid = Object.keys(recipe)
      .filter((e) => e.includes('strIngredient'));
    if (avaliableIngrid.length === checkedIngredients.length) {
      this.setState({
        statusDisabled: !statusDisabled,
      });
    }
  }

  render() {
    const { history } = this.props;
    const {
      recipe, favorite, statusCheck, statusDisabled } = this.state;
    const favoriteImg = (favorite) ? blackHeartIcon : whiteHeartIcon;
    return (
      <main>
        <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb }
          alt={ recipe.strTags }
          tagname={ recipe.strTags }
        />
        <p data-testid="recipe-category">{ recipe.strCategory }</p>
        <h3>Ingredients</h3>
        <ul>
          {
            Object.keys(recipe).filter((key) => key.includes('strIngredient'))
              .map((ingredient, index) => {
                if (recipe[ingredient] === '' || recipe[ingredient] === null) {
                  return <div key={ index }> </div>;
                }
                const measure = `strMeasure${index + 1}`;
                return (
                  <label
                    key={ index }
                    htmlFor="ingridients"
                  >
                    <input
                      type="checkbox"
                      data-testid={ `${index}-ingridient-step` }
                      onChange={ () => {
                        this.recipeProgress(recipe[ingredient]);
                        this.finalizeRecipe();
                      } }
                      className={ statusCheck }
                      checked={ statusCheck }
                    />
                    {`${recipe[measure]} ${recipe[ingredient]}`}
                  </label>
                );
              })
          }
        </ul>
        <section>
          <h3>Instructions:</h3>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
          <section>
            <Share
              keyused="history"
              history={ history.location.pathname }
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
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ statusDisabled }
          >
            Finalizar receita
          </button>
        </section>
      </main>
    );
  }
}

FoodsInProgress.propTypes = {
  id: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
