import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Foods extends Component {
  render() {
    const { history } = this.props;
    return (
      <Header tittle="Foods" searchBool="true" history={ history } />
    );
  }
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Foods;
