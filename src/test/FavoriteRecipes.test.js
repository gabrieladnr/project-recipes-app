import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import favoriteRecipes from './helpers/favoritesLocalStorage';

describe('Favorite Recipes Empty: ', () => {
  test('Testa se não tem nenhuma receita favoritada, aparece apenas uma mensagem', () => {
    renderWithRouterAndRedux(<App />, '/favorite-recipes');

    const semFavorito = screen.getByText('Não possui favoritos');
    expect(semFavorito).toBeInTheDocument();
  });
});

describe('Testes a página Favorite Recipes com receitas favoritadas', () => {
  const favoriteRoute = '/favorite-recipes';
  const buttonInfo = '0-horizontal-name';

  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  test('Testa se, ao favoritar uma bebida ou comida, os inputs aparecem na tela',
    () => {
      renderWithRouterAndRedux(<App />, favoriteRoute);
      const food = screen.getByRole('button', { name: /food/i });
      expect(food).toBeInTheDocument();

      const drinks = screen.getByRole('button', { name: /drinks/i });
      expect(drinks).toBeInTheDocument();

      const all = screen.getByRole('button', { name: /all/i });
      expect(all).toBeInTheDocument();

      const element1 = screen.getByTestId(buttonInfo);
      expect(element1).toBeInTheDocument();

      const element2 = screen.getByTestId('1-horizontal-name');
      expect(element2).toBeInTheDocument();
    });

  test('Testa se, ao cliclar em food, ele filtra', () => {
    renderWithRouterAndRedux(<App />, favoriteRoute);
    const food = screen.getByRole('button', { name: /food/i });
    const drinkAquamarine = screen.getAllByRole('button', { name: /Aquamarine/i });
    const foodSpicy = screen.getAllByRole('button', { name: /Spicy Arrabiata Penne/i });
    expect(food).toBeInTheDocument();
    expect(foodSpicy[0]).toBeInTheDocument();
    expect(drinkAquamarine[0]).toBeInTheDocument();
    userEvent.click(food);
    expect(foodSpicy[0]).toBeInTheDocument();
    expect(drinkAquamarine[0]).not.toBeInTheDocument();
  });

  test('Testa se, ao cliclar em drinks, ele filtra', () => {
    renderWithRouterAndRedux(<App />, favoriteRoute);
    const drinks = screen.getByRole('button', { name: /Drinks/i });
    const drinkAquamarine = screen.getByTestId('1-horizontal-name');
    const foodSpicy = screen.getByTestId(buttonInfo);
    expect(drinks).toBeInTheDocument();
    expect(foodSpicy).toBeInTheDocument();
    expect(drinkAquamarine).toBeInTheDocument();
    userEvent.click(drinks);
    const drinkAqua = screen.getByTestId(buttonInfo);
    expect(drinkAqua).toBeInTheDocument();
  });

  test('Testa se, ao cliclar em all, ele filtra', () => {
    renderWithRouterAndRedux(<App />, favoriteRoute);
    const all = screen.getByRole('button', { name: /all/i });
    const drinkAquamarine = screen.getAllByRole('button', { name: /Aquamarine/i });
    const foodSpicy = screen.getAllByRole('button', { name: /Spicy Arrabiata Penne/i });
    expect(all).toBeInTheDocument();
    expect(foodSpicy[0]).toBeInTheDocument();
    expect(drinkAquamarine[0]).toBeInTheDocument();
    userEvent.click(all);
    expect(drinkAquamarine[0]).toBeInTheDocument();
    expect(foodSpicy[0]).toBeInTheDocument();
  });

  test('Testa se, ao cliclar no botão de favoritos, ele desfavorita', () => {
    renderWithRouterAndRedux(<App />, favoriteRoute);
    const buttonFavorite = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(buttonFavorite);
    userEvent.click(screen.getByTestId('0-horizontal-image'));
  });

  test('', () => {
    renderWithRouterAndRedux(<App />, favoriteRoute);
    userEvent.click(screen.getByTestId('0-horizontal-name'));
  });
});
