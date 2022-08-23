import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class RecipeInProgress extends Component {
  constructor() {
    super();
    this.state = {
      // ingredientes que são mostrados na tela, depois de selecionado o prato para ser feito
      displayedIngridients: [],
      statusCheck: '',
      checked: false,
      // estado da lista de ingredientes (quantos estão checked ou não) exibidos na tela, que são salvos no localStorage
      savedIngridients: [],
    };
  }

  // parte da lógica do localStorage
  componentDidMount() {
    this.saveProgress();
  }

  // função para mudar estilo da fonte quando usuário clicar no checkbox e atualizar localStorage após cada mudança
  handleIngridients = () => {
    const { checked, savedIngridients } = this.state;
    if (checked === false) {
      this.setState({
        checked: true,
        statusCheck: 'checked',
      });
      savedIngridients.push(displayedIngridients);
      localStorage.setItem('inProgressRecipes', savedIngridients);
    } else {
      this.setState({
        checked: false,
        statusCheck: '',
      });
      savedIngridients.filter((e) => !e).push(displayedIngridients);
      localStorage.setItem('inProgressRecipes', savedIngridients);
    }
  }

  // Lógica para atualizar o localStorage - caso a pessoa desmarque todos os ingredientes de uma lista de ingredientes de um prato, o obj que armazena os pratos será atualizado, excluindo o objeto/array contento os ingredientes.
  updateLocalStorage = () => {
    const { checked } = this.state;
    if (checked === true) {
      savedIngridients.map((e) => e);
    } else {
      savedIngridients.filter((e) => !e);
    }
  }

  // função para salvar o estado do andamento da lista de receitas no localStorage
  saveProgress = () => {
    localStorage.setItem('inProgressRecipes', saveRecipes);
  }

  handleFavoriteRcipe = () => {
    // lógica de favoritar
  }

  handleShareRecipe = () => {
    // lógica de compartilhar
  }

  render() {
    const { displayedIngridients, statusCheck } = this.state;
    return (
      <div>
        RecipeInProgress
        <div>
          <img data-testid="recipe-photo" src={ recipeImage } alt="fotoDaReceita" />
          <h1 data-testid="recipe-title">{ recipeName }</h1>
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
            onClick={ this.handleFavoriteRcipe() }
          >
            Favoritar receita
          </button>
          <p data-testid="recipe-category" type="text">Texto da categoria</p>
          <ol>
            {
              // ALTERNATIVA PARA MOSTRAR INGREDIENTES
              Object.keys(displayedIngridients)
                .filter((key) => key
                  .includes('strIngredient'))
                .map((ingredient, index) => {
                  // const testid = `${index}-ingredient-name-and-measure`;
                  if (displayedIngridients[ingredient] === ''
                  || displayedIngridients[ingredient] === null) {
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
                        onChange={ this.handleIngridients() }
                      />
                      {`${displayedIngridients[measure]} 
                      ${displayedIngridients[ingredient]}`}
                    </label>
                  );
                })
            }
            {/* {
              // map dos ingredientes da receita
              // data-testid="${index}-ingredient-step"
              // allIngridients - dados retornados pela API
              displayedIngridients.map((ingridient, index) => (
                <label
                  key={ index }
                  htmlFor="ingridients"
                >
                  {ingridient}
                  <input
                    type="checkbox"
                    data-testid={ `${index}-ingredient-step` }
                    checked={ statusCheck }
                    className={ statusCheck }
                    onChange={ this.handleIngridients() }
                  />
                </label>
              ))
            } */}
          </ol>
          <p data-testid="instructions">Instruções</p>
          <button data-testid="finish-recipe-btn" type="button">Finalizar receita</button>
        </div>
      </div>
    );
  }
}
