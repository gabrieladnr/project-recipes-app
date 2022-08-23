import React from 'react';
import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import Recipes from '../components/Recipes';

describe('Testa o Header', () => {
  const history = createMemoryHistory({ initialEntries: ['/foods'] });

  test('Testa se o Header aparece um título', () => {
    renderWithRouter(
      <Router history={ history }>
        <Recipes history={ history } />
      </Router>,
    );

    const idTittle = screen.getByTestId('page-title');
    expect(idTittle).toBeInTheDocument();
    expect(idTittle.textContent).toBe('Foods');
  });

  test('Testa se o Header tem os icones', () => {
    renderWithRouter(
      <Router history={ history }>
        <Recipes history={ history } />
      </Router>,
    );

    const idProfile = screen.getByTestId('profile-top-btn');
    const idSearch = screen.getByTestId('search-top-btn');
    expect(idProfile).toBeInTheDocument();
    expect(idSearch).toBeInTheDocument();
  });

  test('Testa se ao clicar no icone do profile, ele direciona para o profile',
    () => {
      renderWithRouter(
        <Router history={ history }>
          <Recipes history={ history } />
        </Router>,
      );

      const inputProfile = screen.getByRole('button', { name: /profileIcon/i });
      userEvent.click(inputProfile);
      expect(history.location.pathname).toBe('/profile');
    });

  test(`Testa se ao clicar no icone do Search, aparece o input de pesquisa e ao clicar
duas vezes, o input de pesquisa some`, () => {
    const history2 = createMemoryHistory({ initialEntries: ['/foods'] });
    renderWithRouter(
      <Router history={ history2 }>
        <Recipes history={ history2 } />
      </Router>,
    );
    const idSearch = screen.getByTestId('search-top-btn');
    expect(idSearch).toBeInTheDocument();
    userEvent.click(idSearch);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    userEvent.click(idSearch);
    expect(inputSearch).not.toBeInTheDocument();
  });
});
