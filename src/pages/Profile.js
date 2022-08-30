import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/profile.css';

class Profile extends Component {
  render() {
    const { history } = this.props;
    const email = localStorage.getItem('user');
    return (
      <>
        <Header tittle="Profile" searchBool="false" history={ history } />
        <div className="profile">
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => {
              localStorage.clear();
              history.push('/');
            } }
          >
            Logout
          </button>
          <p data-testid="profile-email">{email !== null && JSON.parse(email).email}</p>
        </div>
        <Footer history={ history } />
      </>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
