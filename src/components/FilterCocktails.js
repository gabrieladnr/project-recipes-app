import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class FilterCocktails extends React.Component {
  // renderiza 5 botões com as categorias de drinks
  renderFilterCocktailsCategoryButtons() {
    const { drinks } = this.props;
    const maxCategoriesNumber = 5;
    return drinks.filter((_, index) => index <= maxCategoriesNumber)
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

const mapStateToProps = (state) => ({
  drinks: state.cocktails.cocktails,
});

export default connect(mapStateToProps)(FilterCocktails);

FilterCocktails.propTypes = {
  drinks: propTypes.arrayOf(propTypes.shape()).isRequired,
};
