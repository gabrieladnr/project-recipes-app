import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import favoriteRecipes, { doneRecipes } from './helpers/favoritesLocalStorage';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';

describe('Testando o componente Drink Details:', () => {
  beforeEach(() => {
    global.fetch = async (url) => {
      console.log(url);
      switch (url) {
      case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771':
        return {
          json: jest.fn().mockResolvedValue(oneMeal),
        };
      default:
        return {
          json: jest.fn().mockResolvedValue(drinks),
        };
      }
    };
  });

  test('botão de Continue a receita:', async () => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    localStorage.setItem('inProgressRecipes', '{"meals":{"52771":{"id":"52771"}}}');
    renderWithRouterAndRedux(<App />, '/foods/52771');
    await waitFor(() => {
      screen.getByTestId('4-recomendation-card');
    });
    userEvent.click(screen.getByTestId('start-recipe-btn'));
    screen.logTestingPlaygroundURL();
  });

  test('botão de Continue a receita:', async () => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    localStorage.setItem('inProgressRecipes', '{"meals":{"52771":{"id":"52771"}}}');
    renderWithRouterAndRedux(<App />, '/foods/52771');
    await waitFor(() => {
      screen.getByTestId('4-recomendation-card');
    });
    userEvent.click(screen.getByTestId('favorite-btn'));
    screen.logTestingPlaygroundURL();
  });
});
