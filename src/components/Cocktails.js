import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCocktails } from '../redux/actions';
import '../pages/foods.css';
import FilterCocktails from './FilterCocktails';

class Cocktails extends React.Component {
  componentDidMount() {
    const { disptachCocktails } = this.props;
    disptachCocktails();
  }

  // renderiza as primeiras 12 receitas de bebidas da API

  renderCocktails() {
    const { drinks } = this.props;
    const maxCocktailsNumber = 12;

    return drinks.filter((_, index) => index <= maxCocktailsNumber)
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
    return (
      <div>
        <h3>Cocktail Recipes</h3>
        <FilterCocktails />
        {/* <div>{this.renderCocktails()}</div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  drinks: state.cocktails.cocktails,
});

const mapDispatchToProps = (dispatch) => ({
  disptachCocktails: () => dispatch(fetchCocktails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);

Cocktails.propTypes = {
  disptachCocktails: propTypes.func.isRequired,
  drinks: propTypes.arrayOf(propTypes.shape()).isRequired,
};

// https://stackoverflow.com/questions/56168771/how-to-limit-for-10-results-the-array-filter
