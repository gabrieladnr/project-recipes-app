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

  render() {
    const { searchButton, history } = this.props;
    return (
      <div className="cocktails-recipes recipes">
        <h3 className="recipes-title">Cocktail Recipes</h3>
        {
          (searchButton)
            ? <SearchBar history={ history } />
            : <FilterCocktails history={ history } />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
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
  searchButton: propTypes.bool.isRequired,
  history: propTypes.shape().isRequired,
};
