import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('verifica o funcionamento da tela de receitas', () => {
  render(<Router><App /></Router>);
});
