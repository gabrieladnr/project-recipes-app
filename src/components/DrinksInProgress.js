import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Share from './Share';
import CheckList from './CheckList';
import { getRecipeDrinks } from '../redux/actions';

class DrinksInProgress extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      statusDisabled: true,
    };
  }

  componentDidMount() {
    const { id, payload } = this.props;
    payload(id);
    this.getRecipeById(id);
  }

  getRecipeById = async (id) => {
    if (localStorage.getItem('favoriteRecipes') !== null
    && JSON.parse(localStorage.getItem('favoriteRecipes'))
      .some((item) => item.id === id)) {
      this.setState({ favorite: true });
    }
  }

  favoriteRecipe = () => {
    const { id, drinkRecipe } = this.props;
    const { drinks: { drinks } } = drinkRecipe;
    const recipe = drinks[0];
    const { favorite } = this.state;

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

  changeDisable = () => {
    const { statusDisabled } = this.state;
    this.setState({ statusDisabled: !statusDisabled });
  }

  doneRecipe = () => {
    const { history, drinkRecipe } = this.props;
    const { drinks: { drinks } } = drinkRecipe;
    const recipe = drinks[0];
    const data = new Date();
    const dataFormatada = `${data.getDate()}/${data.getMonth() + 1}/${
      data.getFullYear()}`;
    let tags;
    if (recipe.strTags !== null) {
      tags = recipe.strTags.split(', ');
    } else {
      tags = [];
    }
    let newDoneRecipe = [];
    if (JSON.parse(localStorage.getItem('doneRecipes'))) {
      const dataDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      newDoneRecipe = [
        ...dataDoneRecipes,
        {
          id: recipe.idDrink,
          type: 'drink',
          nationality: '',
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic,
          name: recipe.strDrink,
          image: recipe.strDrinkThumb,
          doneDate: dataFormatada,
          tags,
        }];
    } else {
      newDoneRecipe = [
        {
          id: recipe.idDrink,
          type: 'drink',
          nationality: '',
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic,
          name: recipe.strDrink,
          image: recipe.strDrinkThumb,
          doneDate: dataFormatada,
          tags,
        }];
    }
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipe));
    history.push('/done-recipes');
  }

  render() {
    const { drinkRecipe, id } = this.props;
    const { drinks: { drinks } } = drinkRecipe;
    const { favorite, statusDisabled } = this.state;
    const favoriteImg = (favorite) ? blackHeartIcon : whiteHeartIcon;
    if (drinks !== undefined) {
      const recipe = drinks[0];
      const avaliableIngrid = Object.keys(recipe)
        .filter((e) => e.includes('strIngredient'));
      const uncheckedIngrid = [];
      avaliableIngrid.forEach((ingredient, index) => {
        if (recipe[ingredient] !== '' && recipe[ingredient] !== null) {
          const measure = `strMeasure${index + 1}`;
          if (recipe[measure] !== '' && recipe[measure] !== null) {
            uncheckedIngrid.push(`${recipe[measure]} ${recipe[ingredient]}`);
          } else {
            uncheckedIngrid.push(`${recipe[ingredient]}`);
          }
        }
      });
      return (
        <main className="detail-page">
          <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
          <img
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb }
            alt={ recipe.strTags }
            tagname={ recipe.strTags }
          />
          <p data-testid="recipe-category">{ recipe.strAlcoholic }</p>
          <h3>Ingredients</h3>
          <CheckList
            changeDisable={ this.changeDisable }
            ingred={ uncheckedIngrid }
            statusDisabled={ statusDisabled }
            id={ id }
            type="drink"
          />
          <section>
            <h3>Instructions:</h3>
            <p data-testid="instructions">{ recipe.strInstructions }</p>
            <section className="shareComponent">
              <Share
                keyused="history"
                pathname={ `/drinks/${id}` }
                item={ { type: '', id: '' } }
                testId="share-btn"
              />
              <button
                type="button"
                className="favorite-button"
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
              onClick={ () => this.doneRecipe() }
            >
              Finalizar receita
            </button>
          </section>
        </main>
      );
    }
    return <> </>;
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
  drinkRecipe: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))),
  ).isRequired,
  payload: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  drinkRecipe: state.recipeReducer,
});

const mapDispatchToProps = (dispatch) => ({
  payload: (id) => dispatch(getRecipeDrinks(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinksInProgress);
