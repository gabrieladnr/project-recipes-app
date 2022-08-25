import React, { Component } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Share from './Share';

export default class DrinksInProgress extends Component {
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
    const { id } = this.props;
    if (localStorage.getItem('favoriteRecipes') !== null
    && JSON.parse(localStorage.getItem('favoriteRecipes'))
      .some((item) => item.id === id)) {
      const oldFavorites = localStorage.getItem('favoriteRecipes');
      const newFavorites = JSON.parse(oldFavorites).filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const oldFavorites = (localStorage.getItem('favoriteRecipes') !== null)
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
      cocktails: {
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

  // compartilhar - check
  // habilitar botão quando todos os checkmarks estiverem procados - check em teoria
  // favorite - check
  // marcar os ingredientes - riscando as palavras - check
  // salvar estado da receita - localStorage - check

  render() {
    const { history } = this.props;
    const { recipe, favorite, statusCheck, statusDisabled } = this.state;
    const favoriteImg = (favorite) ? blackHeartIcon : whiteHeartIcon;
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

DrinksInProgress.propTypes = {
  id: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
