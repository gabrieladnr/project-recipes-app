import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class FavoriteRecipes extends Component {
  render() {
    const { history } = this.props;
    return (
      <Header tittle="Favorite Recipes" searchBool="false" history={ history } />
    );
  }
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FavoriteRecipes;
