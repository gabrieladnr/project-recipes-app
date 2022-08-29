import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { doneRecipes } from './helpers/favoritesLocalStorage';

describe('testes do done-recipes:', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });
  const done = '/done-recipes';
  test('testando os filtros do DoneRecipes', () => {
    renderWithRouterAndRedux(<App />, done);
    userEvent.click(screen.getByTestId('filter-by-all-btn'));
    userEvent.click(screen.getByTestId('filter-by-food-btn'));
    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    screen.logTestingPlaygroundURL();
  });

  test('testando o redirecionamento para DrinkDetails:', () => {
    const { history } = renderWithRouterAndRedux(<App />, done);
    userEvent.click(screen.getByTestId('button-0-horizontal-name'));
    expect(history.location.pathname).toBe('/foods/52771');
  });

  test('testando o redirecionamento para DrinkDetails:', () => {
    const { history } = renderWithRouterAndRedux(<App />, done);
    userEvent.click(screen.getByTestId('button-0-horizontal-image'));
    expect(history.location.pathname).toBe('/foods/52771');
  });
});
