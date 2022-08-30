import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import favoriteRecipes, { doneRecipes } from './helpers/favoritesLocalStorage';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';
import oneDrink from '../../cypress/mocks/oneDrink';
import meals from '../../cypress/mocks/meals';

const link = '/foods/52771';

describe('Testando o componente Drink Details:', () => {
  beforeEach(() => {
    global.fetch = async (url) => {
      console.log(url);
      switch (url) {
      case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771':
        return {
          json: jest.fn().mockResolvedValue(oneMeal),
        };
      case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997':
        return {
          json: jest.fn().mockResolvedValue(oneDrink),
        };
      case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
        return {
          json: jest.fn().mockResolvedValue(meals),
        };
      default:
        return {
          json: jest.fn().mockResolvedValue(drinks),
        };
      }
    };
  });

  test('favoritado', async () => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    localStorage.setItem('inProgressRecipes', '{"meals":{"52771":{"id":"52771"}}}');
    renderWithRouterAndRedux(<App />, link);
    await waitFor(() => {
      screen.getByTestId('4-recomendation-card');
    });
    userEvent.click(screen.getByTestId('start-recipe-btn'));
    screen.logTestingPlaygroundURL();
  });

  test('receita feita', async () => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    localStorage.setItem('inProgressRecipes', '{"meals":{"52771":{"id":"52771"}}}');
    renderWithRouterAndRedux(<App />, link);
    await waitFor(() => {
      screen.getByTestId('4-recomendation-card');
    });
    userEvent.click(screen.getByTestId('favorite-btn'));
    screen.logTestingPlaygroundURL();
  });

  test('recomendation click', async () => {
    localStorage.clear();
    renderWithRouterAndRedux(<App />, link);
    await waitFor(() => {
      screen.getByTestId('3-recomendation-card');
    });
    userEvent.click(screen.getAllByTestId('button-recomen-card')[0]);
    screen.logTestingPlaygroundURL();
  });
});
