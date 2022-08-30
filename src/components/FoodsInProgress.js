import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Share from './Share';
import CheckList from './CheckList';
import { getRecipeMeals } from '../redux/actions';

class FoodsInProgress extends Component {
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
    const { id, mealRecipe } = this.props;
    const { meals: { meals } } = mealRecipe;
    const recipe = meals[0];
    const { favorite } = this.state;

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

  changeDisable = () => {
    const { statusDisabled } = this.state;
    this.setState({ statusDisabled: !statusDisabled });
  }

  doneRecipe = () => {
    const { history, mealRecipe } = this.props;
    const { meals: { meals } } = mealRecipe;
    const recipe = meals[0];
    const data = new Date();
    const dataFormatada = `${data.getDate()}/${data.getMonth() + 1}/${
      data.getFullYear()}`;
    const tags = recipe.strTags.split(', ');
    let newDoneRecipe = [];
    if (JSON.parse(localStorage.getItem('doneRecipes'))) {
      const dataDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      newDoneRecipe = [
        ...dataDoneRecipes,
        {
          id: recipe.idMeal,
          type: 'food',
          nationality: recipe.strArea,
          category: recipe.strCategory,
          alcoholicOrNot: '',
          name: recipe.strMeal,
          image: recipe.strMealThumb,
          doneDate: dataFormatada,
          tags,
        }];
    } else {
      newDoneRecipe = [
        {
          id: recipe.idMeal,
          type: 'food',
          nationality: recipe.strArea,
          category: recipe.strCategory,
          alcoholicOrNot: '',
          name: recipe.strMeal,
          image: recipe.strMealThumb,
          doneDate: dataFormatada,
          tags,
        }];
    }
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipe));
    history.push('/done-recipes');
  }

  render() {
    const { history, mealRecipe, id } = this.props;
    const { meals: { meals } } = mealRecipe;
    const {
      favorite,
      statusDisabled,
    } = this.state;
    const favoriteImg = (favorite) ? blackHeartIcon : whiteHeartIcon;
    if (meals !== undefined) {
      const recipe = meals[0];
      const avaliableIngrid = Object.keys(recipe)
        .filter((e) => e.includes('strIngredient'));
      const uncheckedIngrid = [];
      avaliableIngrid.forEach((ingredient, index) => {
        if (recipe[ingredient] !== '' && recipe[ingredient] !== null) {
          const measure = `strMeasure${index + 1}`;
          uncheckedIngrid.push(`${recipe[measure]} ${recipe[ingredient]}`);
        }
      });
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
          <CheckList
            changeDisable={ this.changeDisable }
            ingred={ uncheckedIngrid }
            statusDisabled={ statusDisabled }
            id={ id }
            type="food"
          />
          <section>
            <h3>Instructions:</h3>
            <p data-testid="instructions">{ recipe.strInstructions }</p>
            <section>
              <Share
                keyused="history"
                pathname={ history.location.pathname }
                item={ { type: '', id: '' } }
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

FoodsInProgress.propTypes = {
  id: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  mealRecipe: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))),
  ).isRequired,
  payload: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  mealRecipe: state.recipeReducer,
});

const mapDispatchToProps = (dispatch) => ({
  payload: (id) => dispatch(getRecipeMeals(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodsInProgress);
