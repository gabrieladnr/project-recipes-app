import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { doneRecipes } from './helpers/favoritesLocalStorage';
import oneDrink from '../../cypress/mocks/oneDrink';
import meals from '../../cypress/mocks/meals';

describe('Testando o componente Drink Details:', () => {
  beforeEach(() => {
    global.fetch = async (url) => {
      console.log(url);
      switch (url) {
      case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319':
        return {
          json: jest.fn().mockResolvedValue(oneDrink),
        };
      default:
        return {
          json: jest.fn().mockResolvedValue(meals),
        };
      }
    };
  });
  const drinksId = '/drinks/178319';
  test('testando o component sem start e continue', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    localStorage.setItem('inProgressRecipes', '{"cocktails":{"178319":{"id":"178319"}}}');
    renderWithRouterAndRedux(<App />, drinksId);
    await waitFor(() => {
      screen.getByTestId('5-recomendation-card');
    });
    screen.logTestingPlaygroundURL();
  });

  test('botão de Comece a receita:', async () => {
    localStorage.clear();
    renderWithRouterAndRedux(<App />, drinksId);
    await waitFor(() => {
      screen.getByTestId('4-recomendation-card');
    });
    userEvent.click(screen.getByTestId('start-recipe-btn'));
    screen.logTestingPlaygroundURL();
  });

  test('botão de Continue a receita:', async () => {
    localStorage.clear();
    localStorage.setItem('inProgressRecipes', '{"cocktails":{"178319":{"id":"178319"}}}');
    renderWithRouterAndRedux(<App />, drinksId);
    await waitFor(() => {
      screen.getByTestId('5-recomendation-card');
    });
    userEvent.click(screen.getByTestId('favorite-btn'));
    userEvent.click(screen.getByTestId('start-recipe-btn'));
    screen.logTestingPlaygroundURL();
  });
});
