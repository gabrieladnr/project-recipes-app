import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';

describe('Testa o componente DrinksInProgress', () => {
  beforeEach(() => {
    global.fetch = async (url) => {
      switch (url) {
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
        return {
          json: jest.fn().mockResolvedValue(drinks),
        };
      case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
        return {
          json: jest.fn().mockResolvedValue(drinkCategories),
        };
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=digitamos':
        return {
          json: jest.fn().mockResolvedValue(oneDrink),
        };
      default:
        return {
          json: jest.fn().mockResolvedValue({ drinks: [], meals: [] }),
        };
      }
    };
  });

  it('Testa se os inputs estão na tela', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const drink = await screen.findByTestId('0-recipe-card');
    userEvent.click(drink);

    const buttonStart = await screen.findByTestId('start-recipe-btn');
    userEvent.click(buttonStart);
    screen.logTestingPlaygroundURL();
  });
});

/* describe('Testa o component FoodsInProgress', () => {
}); */
