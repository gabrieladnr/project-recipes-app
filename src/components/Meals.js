import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchMeals, { fetchMealsCategory } from '../redux/actions';
import FilterMeals from './FilterMeals';
import SearchBar from './SearchBar';

class Meals extends React.Component {
  componentDidMount() {
    const { disptachMeals, disptachMealsCategory } = this.props;
    disptachMeals();
    disptachMealsCategory();
  }

  render() {
    const { searchButton, history } = this.props;
    return (
      <div>
        <h3>Food Recipes</h3>
        {
          (searchButton)
            ? <SearchBar history={ history } />
            : <FilterMeals history={ history } />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchButton: state.header.buttonToggle,
});

const mapDispatchToProps = (dispatch) => ({
  disptachMeals: () => dispatch(fetchMeals()),
  disptachMealsCategory: () => dispatch(fetchMealsCategory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meals);

Meals.propTypes = {
  disptachMeals: propTypes.func.isRequired,
  disptachMealsCategory: propTypes.func.isRequired,
  searchButton: propTypes.bool.isRequired,
  history: propTypes.shape().isRequired,
};

// https://stackoverflow.com/questions/56168771/how-to-limit-for-10-results-the-array-filter
