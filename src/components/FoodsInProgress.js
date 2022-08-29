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
      statusCheck: false,
      statusClass: 'unchecked',
      checked: false,
      checkedIngredients: [],
      statusDisabled: true,
    };
  }

  componentDidMount() {
    const { id, payload } = this.props;
    payload(id);
    this.getRecipeById(id);
    this.maintainProgress();
  }

  getRecipeById = async (id) => {
    if (localStorage.getItem('favoriteRecipes') !== null
    && JSON.parse(localStorage.getItem('favoriteRecipes'))
      .some((item) => item.id === id)) {
      this.setState({ favorite: true });
    }
  }

  favoriteRecipe = () => {
    const { id } = this.props;
    const { mealRecipe, favorite } = this.state;
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
          id: mealRecipe.idMeal,
          type: 'food',
          nationality: mealRecipe.strArea,
          category: mealRecipe.strCategory,
          alcoholicOrNot: '',
          name: mealRecipe.strMeal,
          image: mealRecipe.strMealThumb,
        },
      ] : [
        {
          id: mealRecipe.idMeal,
          type: 'food',
          nationality: mealRecipe.strArea,
          category: mealRecipe.strCategory,
          alcoholicOrNot: '',
          name: mealRecipe.strMeal,
          image: mealRecipe.strMealThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      // -----------------------------------------------------
    }
    this.setState({ favorite: !favorite });
  }

  recipeProgress = (ingredient) => {
    const { checked, mealRecipe, checkedIngredients } = this.state;
    if (!checked) {
      this.setState({
        checked: true,
        statusClass: 'checked',
        checkedIngredients: [...checkedIngredients, ingredient],
      });
    } else {
      this.setState({
        checked: false,
        statusClass: 'unchecked',
        checkedIngredients: checkedIngredients.filter((item) => item !== ingredient),
      });
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...JSON.parse(localStorage.getItem('inProgressRecipes')),
      meals: {
        [`${mealRecipe.idMeal}`]: checkedIngredients,
      },
    }));
  }

  maintainProgress = () => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      this.setState({
        checkedIngredients: progress,
      });
    } else {
      this.setState({
        checkedIngredients: [],
      });
    }
  }

  finalizeRecipe = () => {
    const { mealRecipe } = this.props;
    const { checkedIngredients, statusDisabled } = this.state;
    const avaliableIngrid = Object.keys(mealRecipe)
      .filter((e) => e.includes('strIngredient'));
    if (avaliableIngrid.length === checkedIngredients.length) {
      this.setState({
        statusDisabled: !statusDisabled,
      });
    }
  }

  handleChange = ({ target }) => {
    const { checked } = this.state;
    const { value } = target.checked;
    if (checked === false) {
      this.setState({
        statusCheck: value,
      });
    }
  }

  render() {
    const { history, mealRecipe } = this.props;
    const { meals: { meals } } = mealRecipe;
    const {
      favorite,
      statusCheck,
      statusDisabled,
      statusClass } = this.state;
    const favoriteImg = (favorite) ? blackHeartIcon : whiteHeartIcon;
    if (meals !== undefined) {
      const recipe = meals[0];
      const infoObj = {
        recipe,
        statusCheck,
        statusClass,
      };
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
          {
            Object.keys(recipe).length > 0 && <CheckList
              infoObj={ infoObj }
              handleChange={ this.handleChange }
              recipeProgress={ this.recipeProgress }
              finalizeRecipe={ this.finalizeRecipe }
            />
          }
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
              onClick={ () => history.push('/done-recipes') }
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
