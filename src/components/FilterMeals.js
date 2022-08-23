import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class FilterMeals extends React.Component {
  // implementa o filtro por categoria ao clicar no botão de categoria,
  // renderizando no click 12 receitas da categoria

  handleCategoryButtonClick() {
    const { mealsCategories } = this.props;
    console.log(mealsCategories);
  }

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
          onClick={ this.handleCategoryButtonClick() }
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
