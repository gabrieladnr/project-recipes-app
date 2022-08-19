import React, { Component } from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default class Footer extends Component {
  render() {
    return (
      <div data-testid="footer" className="Footer">
        Footer
        <div>
          <img src={ drinkIcon } alt="drinkImage" />
          <button
            data-testid="drinks-bottom-btn"
            type="button"
            onClick={ push('/drinks') }
          >
            Drinks
          </button>
        </div>
        <div>
          <img src={ mealIcon } alt="foodImage" />
          <button
            data-testid="food-bottom-btn"
            type="button"
            onClick={ push('/foods') }
          >
            Foods
          </button>
        </div>
      </div>
    );
  }
}
