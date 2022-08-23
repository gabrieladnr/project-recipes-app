import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { searchButtonToggle } from '../redux/actions/headerActions';

class Header extends Component {
  handleClickSearch = () => {
    const { searchToggle } = this.props;
    searchToggle();
  }

  render() {
    const { history, searchBool, tittle } = this.props;
    return (
      <header>
        <input
          data-testid="profile-top-btn"
          type="image"
          src={ profileIcon }
          alt="profileIcon"
          onClick={ () => {
            history.push('/profile');
          } }
        />
        <h1 data-testid="page-title">{tittle}</h1>
        {
          searchBool === 'true' && (
            <input
              data-testid="search-top-btn"
              type="image"
              src={ searchIcon }
              alt="searchIcon"
              onClick={ this.handleClickSearch }
            />
          )
        }
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchToggle: () => dispatch(searchButtonToggle()),
});

Header.propTypes = {
  searchToggle: PropTypes.func.isRequired,
  searchBool: PropTypes.string.isRequired,
  tittle: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Header);
