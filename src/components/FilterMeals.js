import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class FilterMeals extends React.Component {
  // renderiza 5 botões com as categorias de comidas
  renderFilterMealCategoryButtons() {
    const { mealsCategories } = this.props;
    const maxCategoriesNumber = 5;
    return mealsCategories.filter((_, index) => index <= maxCategoriesNumber)
      .map((meal) => (
        <button
          type="button"
          key={ meal.strCategory }
          data-testid={ `${meal.strCategory}-category-filter` }
        // onClick={}
        >
          { meal.strCategory}
        </button>));
  }

  render() {
    return (
      <div>
        { this.renderFilterMealCategoryButtons() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mealsCategories: state.meals.mealsCategories,
});

export default connect(mapStateToProps)(FilterMeals);

FilterMeals.propTypes = {
  mealsCategories: propTypes.arrayOf(propTypes.shape()).isRequired,

};
