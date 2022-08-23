import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Drinks extends Component {
  render() {
    const { history } = this.props;
    return (
      <Header tittle="Drinks" searchBool="true" history={ history } />
    );
  }
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Drinks;
