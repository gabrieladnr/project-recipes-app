import React from 'react';
import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import Profile from '../pages/Profile';
import App from '../App';

describe('Testa o Profile', () => {
  test('Testa se ele mostra o email do usuario', async () => {
    const history1 = createMemoryHistory({ initialEntries: ['/'] });
    renderWithRouter(
      <Router history={ history1 }>
        <App history={ history1 } />
      </Router>,
    );

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'trybe@trybe.com');
    userEvent.type(password, '1234567');
    userEvent.dblClick(button);
    expect(history1.location.pathname).toBe('/foods');

    const idProfile = await screen.findByTestId('profile-top-btn');
    expect(idProfile).toBeInTheDocument();
    userEvent.click(idProfile);

    const emailProfile = await screen.findByTestId('profile-email');
    expect(emailProfile).toBeInTheDocument();
    expect(emailProfile).toHaveTextContent('trybe@trybe.com');
  });

  test('Testa se, ao clicar no botão Done Recipes, direciona para /done-recipes', () => {
    const history1 = createMemoryHistory({ initialEntries: ['/profile'] });
    renderWithRouter(
      <Router history={ history1 }>
        <Profile history={ history1 } />
      </Router>,
    );
    const idTittle = screen.getByTestId('profile-done-btn');
    expect(idTittle).toBeInTheDocument();
    userEvent.click(idTittle);
    expect(history1.location.pathname).toBe('/done-recipes');
  });

  test(`Testa se, ao clicar no botão Favorite Recipes, direciona para
  /favorite-recipes`, () => {
    const history2 = createMemoryHistory({ initialEntries: ['/profile'] });
    renderWithRouter(
      <Router history={ history2 }>
        <Profile history={ history2 } />
      </Router>,
    );
    const idTittle = screen.getByTestId('profile-favorite-btn');
    expect(idTittle).toBeInTheDocument();
    userEvent.click(idTittle);
    expect(history2.location.pathname).toBe('/favorite-recipes');
  });

  test(`Testa se, ao clicar no botão Logout, ele limpa o localStorage e direciona para
  a tela de Login`, () => {
    const history3 = createMemoryHistory({ initialEntries: ['/profile'] });
    renderWithRouter(
      <Router history={ history3 }>
        <Profile history={ history3 } />
      </Router>,
    );
    const idTittle = screen.getByTestId('profile-logout-btn');
    expect(idTittle).toBeInTheDocument();
    userEvent.click(idTittle);
    expect(history3.location.pathname).toBe('/');
  });
});
