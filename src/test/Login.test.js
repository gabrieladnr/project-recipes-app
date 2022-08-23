import React from 'react';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import Login from '../components/Login';

describe('Testa a tela de Login', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const emailInput = 'email-input';
  const passwordInput = 'password-input';
  const buttonLogin = 'login-submit-btn';

  test('Testa se o input de email, de senha e o botão aparece na tela', () => {
    renderWithRouter(<Login />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Testa se o botão está desabilitado', () => {
    renderWithRouter(<Login />);

    const btn = screen.getByTestId(buttonLogin);

    expect(btn.disabled).toBe(true);
  });

  test('Testa se o botão habilita ao preencher os campos', () => {
    renderWithRouter(<Login />);

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const button = screen.getByTestId(buttonLogin);

    const emailUsuario = 'robson@gmail.com';
    screen.logTestingPlaygroundURL();
    userEvent.type(email, emailUsuario);
    userEvent.type(password, '1234567');
    expect(email).toHaveValue(emailUsuario);
    expect(button.disabled).toBe(false);
  });

  test('Testa se o botão é clicável', () => {
    renderWithRouter(<Login history={ history } />);

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const button = screen.getByTestId(buttonLogin);

    userEvent.type(email, 'trybe@trybe.com');
    userEvent.type(password, '1234567');
    expect(button.disabled).toBe(false);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/foods');
  });
});
