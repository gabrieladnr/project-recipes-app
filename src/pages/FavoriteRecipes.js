import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Share from '../components/Share';
import '../styles/favoriterecipes.css';

class FavoriteRecipes extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      filter: 'all',
    };
  }

  componentDidMount() {
    this.takeFavoriteRecipes('all');
  }

  takeFavoriteRecipes = (filter) => {
    this.setState({
      filter,
    });
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

  // Passo 2.1.2 - Essa função é responsável por atribuir uma classe e estilizar o botão ed filtragem quando este estiver selecionado retorna true ou false;
  filterClass = (filterName) => {
    const { filter } = this.state;
    return (filter === filterName);
  }

  render() {
    const { history } = this.props;
    const { recipes } = this.state;
    const classAb = 'done-recipes-filter-abled';
    const classDis = 'done-recipes-filter-disabled';

    return (
      <div className="favorite-recipes-component">
        <header>
          <Header tittle="Favorite Recipes" searchBool="false" history={ history } />
        </header>
        {
          (localStorage.getItem('favoriteRecipes') === null
          || JSON.parse(localStorage.getItem('favoriteRecipes')).length === 0)
            ? <div>Não possui favoritos</div>
            : (
              <main>
                <section className="filters-done-recipes">
                  <button
                    type="button"
                    className={ (this.filterClass('all')) ? classAb : classDis }
                    data-testid="filter-by-all-btn"
                    onClick={ () => this.takeFavoriteRecipes('all') }
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className={ (this.filterClass('foods')) ? classAb : classDis }
                    data-testid="filter-by-food-btn"
                    onClick={ () => this.takeFavoriteRecipes('foods') }
                  >
                    Food
                  </button>
                  <button
                    type="button"
                    className={ (this.filterClass('drinks')) ? classAb : classDis }
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
                            <section className="shareComponent">
                              <Share
                                keyused="item"
                                history={ history.location.pathname }
                                item={ item }
                                testId={ testIdShare }
                              />
                              <button
                                className="favorite-button"
                                type="button"
                                data-testid={ testIdFavorite }
                                onClick={ () => this.removeFavoriteRecipe(ItemId) }
                                src={ blackHeartIcon }
                              >
                                <img src={ blackHeartIcon } alt="heart-full" />
                              </button>
                            </section>
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
