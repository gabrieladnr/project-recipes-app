import '@testing-library/jest-dom';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../App';
const validEmail = 'test@mail.com';
const validPassword = '1234567';
const invalidEmail = 'test!mail';
const invalidPassword = '123';
const loginBtn = 'login-submit-btn';

describe('Testa se o componente Login:', () => {
  it('possui um formulário com input de email e senha', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEntrar = screen.getByTestId(loginBtn);
    expect(buttonEntrar).toBeInTheDocument();
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeVisible();
    expect(emailInput).toBeVisible();
    userEvent.type(emailInput, validEmail);
    expect(emailInput).toHaveValue(validEmail);
    userEvent.type(passwordInput, validPassword);
    expect(passwordInput).toHaveValue(validPassword);
  });
  it('redireciona para a URL /foods ao clicar no link Entrar', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonEntrar = screen.getByTestId(loginBtn);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId(loginBtn);
    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, validPassword);
    userEvent.click(buttonEntrar);
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
  it('desabilita o botão Entrar caso o e-mail ou a senha sejam inválidos', async () => {
    renderWithRouterAndRedux(<App />);
    const buttonEntrar = screen.getByTestId(loginBtn);
    expect(buttonEntrar).toBeInTheDocument();
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeVisible();
    expect(emailInput).toBeVisible();
    await userEvent.type(emailInput, invalidEmail);
    expect(emailInput).toHaveValue(invalidEmail);
    await userEvent.type(passwordInput, invalidPassword);
    expect(passwordInput).toHaveValue(invalidPassword);
    expect(buttonEntrar).toBeDisabled();
  });
});