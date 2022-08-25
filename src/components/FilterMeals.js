import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class FilterMeals extends React.Component {
  constructor() {
    super();
    this.state = {
      filterOn: false, // controla se o botão de filtro por categoria foi clicado, para renderizar as receitas filtradas
      // filterAll: false, // controla se o botão de All foi clicado, para renderizar todas as receitas
      mealsFilteredByCategory: [], // array de receitas filtradas por categoria retornado da API
    };
  }

  // implementa o filtro All ao clicar no botão All
  // altera o estado local
  // handleAllButtonClick() {
  //   this.setState({ filterAll: true });
  // }

  // implementa o filtro por categoria ao clicar no botão de categoria,
  // altera o estado local
  handleCategoryButtonClick = async (category) => {
    this.setState({ filterOn: true });
    const response = await fetch(`${'https://www.themealdb.com/api/json/v1/1/filter.php?c='}${category}`)
      .then((responseMealsInCategory) => responseMealsInCategory.json());

    const mealsFilteredByCategory = response.meals;
    this.setState({ mealsFilteredByCategory: [...mealsFilteredByCategory] });
  }

  // renderiza no click até 12 receitas da categoria
  renderMealFilteredByCategory() {
    const maxMealsNumber = 12;
    const { mealsFilteredByCategory } = this.state;

    return mealsFilteredByCategory.filter((_, index) => index <= maxMealsNumber)
      .map((meal, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            src={ meal.strMealThumb }
            data-testid={ `${index}-card-img` }
            alt="card-thumb"
            className="thumb-card"
          />
          <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
        </div>));
  }

  // renderiza 5 botões com as categorias de comidas
  renderFilterMealCategoryButtons() {
    const { mealsCategories } = this.props;
    // const { categories } = this.state;
    const maxCategoriesNumber = 5;
    return mealsCategories.filter((_, index) => index <= maxCategoriesNumber)
      .map((meal) => (
        <div key={ meal.strCategory }>
          <button
            type="button"
            key={ meal.strCategory }
            data-testid={ `${meal.strCategory}-category-filter` }
            onClick={ () => this.handleCategoryButtonClick(meal.strCategory) }
          >
            { meal.strCategory}
          </button>

        </div>
      ));
  }

  render() {
    const { filterOn } = this.state;
    return (
      <div>
        { this.renderFilterMealCategoryButtons() }
        <button
          type="button"
          key="All-category-filter"
          data-testid="All-category-filter"
          onClick={ this.handleAllButtonClick }
        >
          All
        </button>
        { filterOn && this.renderMealFilteredByCategory() }
        {/* { filterAll &&} */}
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
