import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';

describe('verifica o funcionamento da tela de receitas', () => {
  renderWithRouterAndRedux(<App />);
});
