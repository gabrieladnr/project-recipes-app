import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class FilterCocktails extends React.Component {
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
        // onClick={}
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

// const mapStateToProps = (state) => ({
//   cocktailCategories: state.cocktails.cocktailCategories,
// });

const mapStateToProps = (state) => console.log(state);

export default connect(mapStateToProps)(FilterCocktails);

FilterCocktails.propTypes = {
  cocktailCategories: propTypes.arrayOf(propTypes.shape()).isRequired,
};
