import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    const { history } = this.props;
    return (
      <Header tittle="Profile" searchBool="false" history={ history } />
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
