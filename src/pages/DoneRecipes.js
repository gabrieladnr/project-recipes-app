import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class DoneRecipes extends Component {
  render() {
    const { history } = this.props;
    return (
      <Header tittle="Done Recipes" searchBool="false" history={ history } />
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default DoneRecipes;
