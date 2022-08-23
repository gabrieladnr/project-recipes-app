import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import '../styles/foods.css';

class Foods extends React.Component {
  render() {
    const { history, foods } = this.props;
    return (
      <div className="foods">
        <SearchBar history={ history } />
        {
          foods.map((foodElement, index) => {
            console.log(foodElement);
            const { strMeal, strMealThumb } = foodElement;
            const maxCards = 12;
            if (index >= maxCards) return '';
            return (
              <div className="card food-card" key={ `foods-${index}` }>
                foods
                <h3 data-testid={ `${index}-card-name` }>{ strMeal }</h3>
                <img
                  src={ strMealThumb }
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
  foods: store.foods.filteredFoods.meals,
});

Foods.propTypes = {
  history: PropTypes.shape().isRequired,
  foods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps, null)(Foods);
