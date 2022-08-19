import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class RecipeInProgress extends Component {
  // para 'riscar' a palavra, inserir o style - textDecoration = "line-through"
  constructor() {
    super();
    this.state = {
      statusCheck: false,
    };
  }

  // função para mudar estilo da fonte quando usuário clicar no checkbox
  handleFont = () => {
    const { statusCheck } = this.state;
    if (statusCheck) {
      return 'checked';
    }
    return null;
  }

  render() {
    return (
      <div>
        RecipeInProgress
        <div>
          <img data-testid="recipe-photo" src="" alt="fotoDaReceita" />
          <h1 data-testid="recipe-title">Título</h1>
          <button data-testid="share-btn" type="button">Compartilhar receita</button>
          <button data-testid="favorite-btn" type="button">Favoritar receita</button>
          <p data-testid="recipe-category" type="text">Texto da categoria</p>
          <ol>
            {
              // map dos ingredientes da receita
              // data-testid="${index}-ingredient-step"
              allIngredients.map((ingridient, index) => (
                <label
                  key={ index }
                  htmlFor="ingridients"
                  className={ this.handleFont() }
                >
                  {ingridient}
                  <input
                    type="checkbox"
                    data-testid={ `${index}-ingredient-step` }
                    checked={ statusCheck }
                  />
                </label>
              ))
            }
          </ol>
          <p data-testid="instructions">Instruções</p>
          <button data-testid="finish-recipe-btn" type="button">Finalizar receita</button>
        </div>
      </div>
    );
  }
}
