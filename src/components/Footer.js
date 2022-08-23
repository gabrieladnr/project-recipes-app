import React, { Component } from 'react';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/FooterStyle.css';

export default class Footer extends Component {
  render() {
    const { history } = this.props;
    return (
      <div data-testid="footer" className="footer">
        Footer
        <div>
          <button
            data-testid="drinks-bottom-btn"
            type="button"
            src={ drinkIcon }
            onClick={ () => history.push('/drinks') }
          >
            Drinks
          </button>
        </div>
        <div>
          <button
            data-testid="food-bottom-btn"
            type="button"
            src={ mealIcon }
            onClick={ () => history.push('/foods') }
          >
            Foods
          </button>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
