import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class FoodDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      recomendation: [],
      copied: false,
      favorite: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getRecipeById(id);
    this.getRecomendation();
  }

  getRecomendation = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const result = await fetch(url)
      .then((response) => response.json());
    this.setState({ recomendation: result.drinks });
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
    const { match: { params: { id } } } = this.props;
    const { recipe, favorite } = this.state;
    if (localStorage.getItem('favoriteRecipes') !== null
    && JSON.parse(localStorage.getItem('favoriteRecipes'))
      .some((item) => item.id === id)) {
      const oldFavorites = localStorage.getItem('favoriteRecipes');
      const newFavorites = JSON.parse(oldFavorites).filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const oldFavorites = (localStorage.getItem('favoriteRecipes') !== null)
        ? localStorage.getItem('favoriteRecipes')
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
    }
    this.setState({ favorite: !favorite });
  }

  render() {
    const { history, match: { params: { id } } } = this.props;
    const { recipe, copied, favorite, recomendation } = this.state;
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
              ).meals)
                .some((item) => item === id))
              ? 'Continue Recipe' : 'Start Recipe'
          }
        </button>);
    }
    const recomendList = (recomendation.length > 0)
      ? recomendation.map((item, index) => {
        const testId = `${index}-recomendation-card`;
        const maxRecomendation = 7;
        if (index < maxRecomendation) {
          return (
            <li data-testid={ testId } key={ item.idDrink }>
              <img src={ item.strDrinkThumb } alt={ item.strDrink } />
              <h3>{item.strDrink}</h3>
            </li>
          );
        }
        return <> </>;
      })
      : <> </>;
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
          <iframe
            title={ recipe.strMeal }
            src={ recipe.strYoutube }
            width="500"
            height="500"
            data-testid="video"
          >
            <p>Your browser does not support iframes.</p>
          </iframe>
          <section>
            {
              btn
            }
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => {
                copy(history.location.pathname);
                this.setState({
                  copied: true,
                });
              } }
            >
              <img src={ shareIcon } alt="share" />
            </button>
            {
              (copied) ? <p>Link copied!</p>
                : <> </>
            }
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ () => this.favoriteRecipe() }
              src={ favoriteImg }
            >
              <img src={ favoriteImg } alt={ JSON.stringify(favorite) } />
            </button>
          </section>
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

FoodDetails.propTypes = {
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

export default FoodDetails;
