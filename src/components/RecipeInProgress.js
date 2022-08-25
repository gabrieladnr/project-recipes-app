import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DrinksInProgress from './DrinksInProgress';
import FoodsInProgress from './FoodsInProgress';

export default class RecipeInProgress extends Component {

  render() {
    const { history, match: { params: { id } } } = this.props;
    const { recipe, statusCheck, favorite, whichItem } = this.state;
    return (
      <div>
        RecipeInProgress
        <div>
          <img data-testid="recipe-photo" src={ recipe } alt="fotoDaReceita" />
          <h1 data-testid="recipe-title">
            { recipe.strMeal
              ? recipe.strMeal : recipe.strDrink }

          </h1>
          <button
            data-testid="share-btn"
            type="button"
            onClick={ this.handleShareRecipe() }
          >
            Compartilhar receita
          </button>
          <button
            data-testid="favorite-btn"
            type="button"
            onClick={ this.favoriteRecipe() }
          >
            Favoritar receita
          </button>
          <p data-testid="recipe-category" type="text">Texto da categoria</p>
          <ol>
            {
              // ALTERNATIVA PARA MOSTRAR INGREDIENTES
              Object.keys(recipe)
                .filter((key) => key
                  .includes('strIngredient'))
                .map((ingredient, index) => {
                  if (recipe[ingredient] === ''
                  || recipe[ingredient] === null) {
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
                        data-testid={ `${index}-ingredient-step` }
                        checked={ statusCheck }
                        className={ statusCheck }
                        onChange={ this.handleRecipeProgress() }
                      />
                      {`${recipe[measure]} 
                      ${recipe[ingredient]}`}
                    </label>
                  );
                })
            }
          </ol>
          <h3>Instructions:</h3>
          <p data-testid="instructions">{ recipe.srtInstructions }</p>
          <button 
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ this.finalizeRecipe() }
          >
            Finalizar receita</button>
        </div>
      </div>
    );
  }
}

RecipeInProgress.propTypes = {
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
