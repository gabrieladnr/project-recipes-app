import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';

class Drinks extends React.Component {
  render() {
    const { history, drinks } = this.props;
    return (
      <div className="drinks">
        DRINKS
        <SearchBar history={ history } />
        {
          drinks.map((foodElement, index) => {
            console.log(foodElement);
            const { strDrink, strDrinkThumb } = foodElement;
            const maxCards = 12;
            if (index >= maxCards) return '';
            return (
              <div className="card food-card" key={ `foods-${index}` }>
                foods
                <h3 data-testid={ `${index}-card-name` }>{ strDrink }</h3>
                <img
                  src={ strDrinkThumb }
                  data-testid={ `${index}-card-img` }
                  alt="card-thumb"
                  className="thumb-card"
                />
                {/* o que eu pensei seria trocar essa função por renderizar Recipes aqui
              Recipes renderiza Meals/Cocktails, que renderizam as 12 receitas
              Recipes renderiza também FilterCocktails/FilterMeals, que renderizam os filtros por categoria
              // o que teria que ser feito dentro do Recipes seria uma renderização condicional
               de acordo com a rota /foods/drinks */}
              </div>
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  drinks: store.drinks.filteredDrinks.drinks,
});

Drinks.propTypes = {
  history: PropTypes.shape().isRequired,
  drinks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps, null)(Drinks);
