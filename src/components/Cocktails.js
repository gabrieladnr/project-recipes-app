import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCocktails, fetchCocktailsCategory } from '../redux/actions';
import '../styles/foods.css';
import FilterCocktails from './FilterCocktails';
import SearchBar from './SearchBar';

class Cocktails extends React.Component {
  componentDidMount() {
    const { disptachCocktails, disptachCocktailsCategory } = this.props;
    disptachCocktails();
    disptachCocktailsCategory();
  }

  // renderiza as primeiras 12 receitas de bebidas da API
  renderCocktails() {
    const { drinks } = this.props;
    const maxCocktailsNumber = 12;

    return drinks.filter((_, index) => index < maxCocktailsNumber)
      .map((cocktail, index) => (
        <div key={ cocktail.idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            src={ cocktail.strDrinkThumb }
            data-testid={ `${index}-card-img` }
            alt="card-thumb"
            className="thumb-card"
          />
          <p data-testid={ `${index}-card-name` }>{ cocktail.strDrink }</p>
        </div>));
  }

  render() {
    const { searchButton, history } = this.props;
    return (
      <div>
        <h3>Cocktail Recipes</h3>
        {
          (searchButton) ? <SearchBar history={ history } /> : <FilterCocktails />
        }
        <div>{this.renderCocktails()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  drinks: state.cocktails.cocktails,
  searchButton: state.header.buttonToggle,
});

const mapDispatchToProps = (dispatch) => ({
  disptachCocktails: () => dispatch(fetchCocktails()),
  disptachCocktailsCategory: () => dispatch(fetchCocktailsCategory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);

Cocktails.propTypes = {
  disptachCocktails: propTypes.func.isRequired,
  disptachCocktailsCategory: propTypes.func.isRequired,
  drinks: propTypes.arrayOf(propTypes.shape()).isRequired,
  searchButton: propTypes.bool.isRequired,
  history: propTypes.shape().isRequired,
};

// https://stackoverflow.com/questions/56168771/how-to-limit-for-10-results-the-array-filter
