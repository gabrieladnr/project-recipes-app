import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class FilterCocktails extends React.Component {
  constructor() {
    super();
    this.state = {
      filterToggle: true, // controla se será exibido filtro por categoria ou All, sendo true == all, e false == filtro de cateogria;
      drinksFilteredByCategory: [], // array de receitas filtradas por categoria retornado da API
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
  // renderizando no click 12 receitas da categoria
  handleCategoryButtonClick = async (category) => {
    const { activeFilter } = this.state;
    if (category === activeFilter) {
      this.setState({ filterToggle: true });
    } else {
      this.setState({ filterToggle: false });
      const response = await fetch(`${'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c='}${category}`)
        .then((responseDrinksInCategory) => responseDrinksInCategory.json());

      const drinksFilteredByCategory = response.drinks;
      this.setState({ drinksFilteredByCategory: [...drinksFilteredByCategory] });
      this.setState({ activeFilter: category });
    }
  }

  // renderiza os cards das primeiras 12 receitas de drinks da API de todas as receitas
  renderAllDrinks() {
    const { drinks } = this.props;
    const maxDrinksNumber = 12;

    return drinks.filter((_, index) => index < maxDrinksNumber)
      .map((drink, index) => (
        <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            src={ drink.strDrinkThumb }
            data-testid={ `${index}-card-img` }
            alt="card-thumb"
            className="thumb-card"
          />
          <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
        </div>));
  }

  // renderiza no click até 12 receitas da categoria
  renderDrinksFilteredByCategory() {
    const maxDrinksNumber = 12;
    const { drinksFilteredByCategory } = this.state;

    return drinksFilteredByCategory.filter((_, index) => index < maxDrinksNumber)
      .map((meal, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            src={ meal.strDrinkThumb }
            data-testid={ `${index}-card-img` }
            alt="card-thumb"
            className="thumb-card"
          />
          <p data-testid={ `${index}-card-name` }>{ meal.strDrink }</p>
        </div>));
  }

  // renderiza 5 botões com as categorias de drinks
  renderFilterCocktailsCategoryButtons() {
    const { cocktailCategories } = this.props;
    const maxCategoriesNumber = 5;
    return cocktailCategories.filter((_, index) => index < maxCategoriesNumber)
      .map((drink) => (
        <button
          type="button"
          key={ drink.strCategory }
          data-testid={ `${drink.strCategory}-category-filter` }
          onClick={ () => this.handleCategoryButtonClick(drink.strCategory) }
        >
          { drink.strCategory}
        </button>));
  }

  render() {
    const { filterToggle } = this.state;
    return (
      <div>
        { this.renderFilterCocktailsCategoryButtons() }
        <button
          type="button"
          key="All-category-filter"
          data-testid="All-category-filter"
          onClick={ this.handleAllButtonClick }
        >
          All
        </button>
        { !filterToggle && this.renderDrinksFilteredByCategory() }
        { filterToggle && this.renderAllDrinks() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cocktailCategories: state.cocktails.cocktailCategories,
  drinks: state.cocktails.cocktails,
});

export default connect(mapStateToProps)(FilterCocktails);

FilterCocktails.propTypes = {
  cocktailCategories: propTypes.arrayOf(propTypes.shape()).isRequired,
  drinks: propTypes.arrayOf(propTypes.shape()).isRequired,
};
