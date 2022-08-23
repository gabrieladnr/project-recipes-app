import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class FilterCocktails extends React.Component {
  // implementa o filtro por categoria ao clicar no botão de categoria,
  // renderizando no click 12 receitas da categoria

  // handleCategoryButtonClick() {

  // }

  // renderiza 5 botões com as categorias de drinks
  renderFilterCocktailsCategoryButtons() {
    const { cocktailCategories } = this.props;
    const maxCategoriesNumber = 5;
    return cocktailCategories.filter((_, index) => index <= maxCategoriesNumber)
      .map((drink) => (
        <button
          type="button"
          key={ drink.strCategory }
          data-testid={ `${drink.strCategory}-category-filter` }
          // onClick={ this.handleCategoryButtonClick() }
        >
          { drink.strCategory}
        </button>));
  }

  render() {
    return (
      <div>
        { this.renderFilterCocktailsCategoryButtons() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    cocktailCategories: state.cocktails.cocktailCategories,
  };
};

export default connect(mapStateToProps)(FilterCocktails);

FilterCocktails.propTypes = {
  cocktailCategories: propTypes.arrayOf(propTypes.shape()).isRequired,
};
