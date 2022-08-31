import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DrinksInProgress from './DrinksInProgress';
import FoodsInProgress from './FoodsInProgress';

export default class RecipeInProgress extends Component {
  render() {
    const { history, match: { params: { id } } } = this.props;
    return (
      (history.location.pathname.includes('food'))
        ? (<FoodsInProgress history={ history } id={ id } />)
        : (<DrinksInProgress history={ history } id={ id } />)
    );
  }
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
