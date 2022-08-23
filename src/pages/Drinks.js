import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

class Drinks extends React.Component {
  /* componentDidUpdate() {
    // exercício 15. Quando a requisição não trouxer produtos, mostre um alert. (Quando não houver produtos a aplicação retorna um array vazio!)
    const { drinks } = this.props;
    if (!drinks?.length) alert('Sorry, we haven\'t found any recipes for these filters.');
  } */

  render() {
    const { history, drinks, searchButton } = this.props;
    return (
      <div className="drinks">
        <Header tittle="Drinks" searchBool="true" history={ history } />
        {
          (searchButton) && <SearchBar history={ history } />
        }
        {
          drinks.map((foodElement, index) => {
            const { strDrink, strDrinkThumb } = foodElement;
            const maxCards = 12;
            if (index >= maxCards) return '';
            return (
              <div
                data-testid={ `${index}-recipe-card` }
                className="card food-card"
                key={ `foods-${index}` }
              >
                foods
                <h3 data-testid={ `${index}-card-name` }>{ strDrink }</h3>
                <img
                  src={ strDrinkThumb }
                  data-testid={ `${index}-card-img` }
                  alt="card-thumb"
                  className="thumb-card"
                />
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
  searchButton: store.header.buttonToggle,
});

Drinks.propTypes = {
  history: PropTypes.shape().isRequired,
  drinks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  searchButton: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Drinks);
