import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import './foods.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Foods extends React.Component {
  /* componentDidUpdate() {
    const { foods } = this.props;
    if (!foods?.length) alert('Sorry, we haven\'t found any recipes for these filters.');
  } */

  render() {
    const { history, foods, searchButton } = this.props;
    return (
      <div className="foods">
        <Header tittle="Foods" searchBool="true" history={ history } />
        {
          (searchButton) && <SearchBar history={ history } />
        }
        {
          foods.map((foodElement, index) => {
            const { strMeal, strMealThumb } = foodElement;
            const maxCards = 12;
            if (index >= maxCards) return '';
            return (
              <div
                className="card food-card"
                key={ `foods-${index}` }
                data-testid={ `${index}-recipe-card` }
              >
                foods
                <h3 data-testid={ `${index}-card-name` }>{ strMeal }</h3>
                <img
                  src={ strMealThumb }
                  data-testid={ `${index}-card-img` }
                  alt="card-thumb"
                  className="thumb-card"
                />
              </div>
            );
          })
        }
        <Footer history={ history } />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  foods: store.foods.filteredFoods.meals,
  searchButton: store.header.buttonToggle,
});

Foods.propTypes = {
  history: PropTypes.shape().isRequired,
  foods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  searchButton: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Foods);
