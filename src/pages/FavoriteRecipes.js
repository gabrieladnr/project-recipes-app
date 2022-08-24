import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavoriteRecipes extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      copied: false,
    };
  }

  componentDidMount() {
    this.takeFavoriteRecipes('all');
  }

  takeFavoriteRecipes = (filter) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    switch (filter) {
    case 'foods':
      this.setState({ recipes: favorites.filter((item) => item.type === 'food') });
      break;
    case 'drinks':
      this.setState({ recipes: favorites.filter((item) => item.type === 'drink') });
      break;
    default:
      this.setState({ recipes: favorites });
      break;
    }
  }

  removeFavoriteRecipe = (id) => {
    const oldFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = oldFavorites.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    this.takeFavoriteRecipes('all');
  }

  sendToDetails = (type, id) => {
    const { history } = this.props;
    history.push(`/${type}s/${id}`);
  }

  render() {
    const { history } = this.props;
    const { recipes, copied } = this.state;

    return (
      <div>
        <header>
          <Header tittle="Favorite Recipes" searchBool="false" history={ history } />
        </header>
        {
          (localStorage.getItem('favoriteRecipes') === null
          || JSON.parse(localStorage.getItem('favoriteRecipes')).length === 0)
            ? <div>Não possui favoritos</div>
            : (
              <main>
                <section>
                  <button
                    type="button"
                    data-testid="filter-by-all-btn"
                    onClick={ () => this.takeFavoriteRecipes('all') }
                  >
                    All
                  </button>
                  <button
                    type="button"
                    data-testid="filter-by-food-btn"
                    onClick={ () => this.takeFavoriteRecipes('foods') }
                  >
                    Food
                  </button>
                  <button
                    type="button"
                    data-testid="filter-by-drink-btn"
                    onClick={ () => this.takeFavoriteRecipes('drinks') }
                  >
                    Drinks
                  </button>
                </section>
                <section>
                  <ul>
                    {
                      recipes.map((item, index) => {
                        const testIdImage = `${index}-horizontal-image`;
                        const testIdName = `${index}-horizontal-name`;
                        const testIdShare = `${index}-horizontal-share-btn`;
                        const testIdFavorite = `${index}-horizontal-favorite-btn`;
                        const testIdTop = `${index}-horizontal-top-text`;
                        const ItemId = item.id;
                        return (
                          <li key={ index }>
                            <input
                              type="image"
                              src={ item.image }
                              alt={ item.name }
                              data-testid={ testIdImage }
                              onClick={ () => this.sendToDetails(item.type, item.id) }
                              width="300px"
                            />
                            {
                              (item.type === 'drink')
                                ? (
                                  <p data-testid={ testIdTop }>
                                    {`${item.alcoholicOrNot} - ${item.category}`}
                                  </p>
                                )
                                : (
                                  <p data-testid={ testIdTop }>
                                    {`${item.nationality} - ${item.category}`}
                                  </p>
                                )
                            }
                            <h3>
                              <button
                                type="button"
                                data-testid={ testIdName }
                                onClick={ () => this.sendToDetails(item.type, item.id) }
                              >
                                {item.name}
                              </button>
                            </h3>
                            <button
                              type="button"
                              data-testid={ testIdShare }
                              src={ shareIcon }
                              onClick={ () => {
                                copy(
                                  `http://localhost:3000/${item.type}s/${item.id}`,
                                );
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
                              data-testid={ testIdFavorite }
                              onClick={ () => this.removeFavoriteRecipe(ItemId) }
                              src={ blackHeartIcon }
                            >
                              <img src={ blackHeartIcon } alt="heart-full" />
                            </button>
                          </li>
                        );
                      })
                    }
                  </ul>
                </section>
              </main>)
        }
      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
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

export default FavoriteRecipes;
