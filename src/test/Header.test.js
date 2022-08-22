import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Drinks from '../pages/Drinks';

describe('Testa o Header', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  test('Testa se o o Header tem um título', () => {
    render(
      <Router history={ history }>
        <Drinks history={ history } />
      </Router>,
    );

    const idTittle = screen.getByTestId('page-title');
    const tittle = screen.getByText(/Drinks/i);
    expect(tittle).toBeInTheDocument();
    expect(idTittle).toBeInTheDocument();
  });

  test('Testa se o Header tem os icones', () => {
    render(
      <Router history={ history }>
        <Drinks history={ history } />
      </Router>,
    );
    const idProfile = screen.getByTestId('profile-top-btn');
    const idSearch = screen.getByTestId('search-top-btn');
    expect(idProfile).toBeInTheDocument();
    expect(idSearch).toBeInTheDocument();
  });

  test('Testa se ao clicar no icone do profile, ele direciona para o profile',
    async () => {
      render(
        <Router history={ history }>
          <Drinks history={ history } />
        </Router>,
      );

      const inputProfile = screen.getByRole('button', { name: /profileIcon/i });
      userEvent.click(inputProfile);
      expect(history.location.pathname).toBe('/profile');
    });

  test(`Testa se ao clicar no icone do Search, aparece o input de pesquisa e ao clicar
duas vezes, o input de pesquisa some`, () => {
    render(
      <Router history={ history }>
        <Drinks history={ history } />
      </Router>,
    );
    const idSearch = screen.getByTestId('search-top-btn');
    userEvent.click(idSearch);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    userEvent.click(idSearch);
    expect(inputSearch).not.toBeInTheDocument();
  });
});
