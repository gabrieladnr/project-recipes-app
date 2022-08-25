import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class FilterMeals extends React.Component {
  constructor() {
    super();
    this.state = {
      filterToggle: true, // controla se será exibido filtro por categoria ou All, sendo true == all, e false == filtro de cateogria;
      mealsFilteredByCategory: [], // array de receitas filtradas por categoria retornado da API
      activeFilter: '', // controla qual filtro está sendo exibido
    };
  }

  // implementa o filtro All ao clicar no botão All
  // altera o estado local para remover filtro de categoria
  handleAllButtonClick = () => {
    this.setState({ filterToggle: true });
    this.setState({ activeFilter: '' });
  }

  // implementa o filtro por categoria ao clicar no botão de categoria,
  // altera o estado local
  handleCategoryButtonClick = async (category) => {
    const { activeFilter } = this.state;
    if (category === activeFilter) {
      this.setState({ filterToggle: true });
      this.setState({ activeFilter: '' });
    } else {
      this.setState({ filterToggle: false });
      const response = await fetch(`${'https://www.themealdb.com/api/json/v1/1/filter.php?c='}${category}`)
        .then((responseMealsInCategory) => responseMealsInCategory.json());

      const mealsFilteredByCategory = response.meals;
      this.setState({ mealsFilteredByCategory: [...mealsFilteredByCategory] });
      this.setState({ activeFilter: category });
    }
  }

  handleClickSendToDetails = (id) => {
    const { history } = this.props;
    history.push(`/foods/${id}`);
  }

  // renderiza os cards das primeiras 12 receitas de comida da API de todas as receitas
  renderAllMeals() {
    const { meals } = this.props;
    const maxMealsNumber = 12;

    return meals.filter((_, index) => index < maxMealsNumber)
      .map((meal, index) => (
        <button
          type="button"
          onClick={ () => this.handleClickSendToDetails(meal.idMeal) }
          key={ meal.idMeal }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ meal.strMealThumb }
            data-testid={ `${index}-card-img` }
            alt="card-thumb"
            className="thumb-card"
          />
          <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
        </button>));
  }

  // renderiza no click até 12 receitas da categoria
  renderMealFilteredByCategory() {
    const maxMealsNumber = 12;
    const { mealsFilteredByCategory } = this.state;

    return mealsFilteredByCategory.filter((_, index) => index < maxMealsNumber)
      .map((meal, index) => (
        <button
          type="button"
          onClick={ () => this.handleClickSendToDetails(meal.idMeal) }
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ meal.strMealThumb }
            data-testid={ `${index}-card-img` }
            alt="card-thumb"
            className="thumb-card"
          />
          <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
        </button>));
  }

  // renderiza 5 botões com as categorias de comidas
  renderFilterMealCategoryButtons() {
    const { mealsCategories } = this.props;
    // const { categories } = this.state;
    const maxCategoriesNumber = 5;
    return mealsCategories.filter((_, index) => index < maxCategoriesNumber)
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
    const { filterToggle } = this.state;
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
        { !filterToggle && this.renderMealFilteredByCategory() }
        { filterToggle && this.renderAllMeals() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mealsCategories: state.meals.mealsCategories,
  meals: state.meals.meals,
});

export default connect(mapStateToProps)(FilterMeals);

FilterMeals.propTypes = {
  mealsCategories: propTypes.arrayOf(propTypes.shape()).isRequired,
  meals: propTypes.arrayOf(propTypes.shape()).isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
    location: propTypes.shape({
      pathname: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
