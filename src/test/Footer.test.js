import React from 'react';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import Recipes from '../components/Recipes';

describe('Testes do componente Footer', () => {
  const history = createMemoryHistory({ initialEntries: ['/foods'] });
  const food = 'food-bottom-btn';
  const drinks = 'drinks-bottom-btn';

  it('Testa se o elemento contendo o footer está presente na tela', () => {
    renderWithRouter(
      <Router history={ history }>
        <Recipes history={ history } />
      </Router>,
    );

    const footerComponent = screen.getByTestId('footer');
    expect(footerComponent).toBeInTheDocument();
  });

  it('Os ícones de comida de bebidas estão presentes na tela', () => {
    renderWithRouter(
      <Router history={ history }>
        <Recipes history={ history } />
      </Router>,
    );

    const foodImg = screen.getByTestId(food);
    const drinkImg = screen.getByTestId(drinks);
    expect(foodImg).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();
  });

  it('O botão food redirecionamento', () => {
    renderWithRouter(
      <Router history={ history }>
        <Recipes history={ history } />
      </Router>,
    );

    const foodBtn = screen.getByTestId(food);
    userEvent.click(foodBtn);
    expect(history.location.pathname).toBe('/foods');
  });

  it('O botão drinks redirecionamento', () => {
    renderWithRouter(
      <Router history={ history }>
        <Recipes history={ history } />
      </Router>,
    );

    const drinkImg = screen.getByTestId(drinks);
    userEvent.click(drinkImg);
    expect(history.location.pathname).toBe('/drinks');
  });
});
