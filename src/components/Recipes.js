import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchMeals from '../redux/actions';

class Recipes extends React.Component {
  // constructor() {
  //   super();
  // this.state = {
  // };
  // }

  componentDidMount() {
    const { disptachMeals } = this.props;
    disptachMeals();
  }

  //   <img data-testid={`${meals.index}-card-img`}
  // type="image/svg+xml"
  // data={ meals.strMealThumb }>Recipe Img</img>

  // const carImgId = `${index}-card-img`;
  // const cardId = `${index}-recipe-card`;
  // const cardNameId = `${index}-card-name`;

  // renderiza as primeiras 12 receitas de comida da API
  renderMeals() {
    const { meals } = this.props;
    return meals.length && meals.map((meal, index) => (
      <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
      </div>
    ));
  }

  render() {
    // const { meals } = this.props;
    return (
      <div>
        <p>Food Recipes</p>
        {/* {meals?.map((meal) => <p key={ meal.strMeal }>{meal.strMeal}</p>)} */}
        <div>{this.renderMeals()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.meals.meals,
});

const mapDispatchToProps = (dispatch) => ({
  disptachMeals: () => dispatch(fetchMeals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);

Recipes.propTypes = {
  disptachMeals: propTypes.func.isRequired,
  meals: propTypes.arrayOf(propTypes.string).isRequired,
};
