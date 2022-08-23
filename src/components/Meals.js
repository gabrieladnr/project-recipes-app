import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchMeals, { fetchMealsCategory } from '../redux/actions';
import FilterMeals from './FilterMeals';

class Meals extends React.Component {
  componentDidMount() {
    const { disptachMeals, disptachMealsCategory } = this.props;
    disptachMeals();
    disptachMealsCategory();
  }

  // renderiza as primeiras 12 receitas de comida da API

  renderMeals() {
    const { meals } = this.props;
    const maxMealsNumber = 12;

    return meals.filter((_, index) => index <= maxMealsNumber)
      .map((meal, index) => (
        <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
          <img
            src={ meal.strMealThumb }
            data-testid={ `${index}-card-img` }
            alt="card-thumb"
            className="thumb-card"
          />
          <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
        </div>));
  }

  render() {
    return (
      <div>
        <h3>Food Recipes</h3>
        <FilterMeals />
        {/* <div>{this.renderMeals()}</div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.meals.meals,
});

const mapDispatchToProps = (dispatch) => ({
  disptachMeals: () => dispatch(fetchMeals()),
  disptachMealsCategory: () => dispatch(fetchMealsCategory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meals);

Meals.propTypes = {
  disptachMeals: propTypes.func.isRequired,
  disptachMealsCategory: propTypes.func.isRequired,
  meals: propTypes.arrayOf(propTypes.shape()).isRequired,
};

// https://stackoverflow.com/questions/56168771/how-to-limit-for-10-results-the-array-filter
