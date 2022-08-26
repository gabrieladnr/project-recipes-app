import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import fetch from '../../cypress/mocks/fetch';
// MOCKS DO CYPRESS PARA NÃO PRECISAR MONTAR OS MODULES:

// import oneDrink from '../../cypress/mocks/oneDrink';
// import drinkCategories from '../../cypress/mocks/drinkCategories';
// import drinks from '../../cypress/mocks/drinks';
// TESTANDO DRINKS
// teste /drinks : ingredientes, retorno +1 objeto.
describe('teste /drinks: name, retorno apenas 1 objeto:', () => {
  beforeEach(() => {
    global.fetch = async (url) => {
      switch (url) {
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
        return {
          json: jest.fn().mockResolvedValue(drinks),
        };
      case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
        return {
          json: jest.fn().mockResolvedValue(drinkCategories),
        };
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=digitamos':
        return {
          json: jest.fn().mockResolvedValue(oneDrink),
        };
      default:
        return {
          json: jest.fn().mockResolvedValue({ drinks: [], meals: [] }),
        };
      }
    };
  });

  test('os inputs estão sendo renderizados na tela', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const search = screen.getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    fireEvent.click(search);
    const inputText = screen.getByTestId('search-input');
    const ingredient = screen.getByRole('radio', { name: /ingredient/i });
    const firstLetter = screen.getByRole('radio', { name: /first letter/i });
    const name = screen.getByRole('radio', { name: /name/i });
    expect(inputText).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    fireEvent.click(search);
  });

  test('Testa se dá para alterar o input de texto', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const search = screen.getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    fireEvent.click(search);

    const inputText = screen.getByTestId('search-input');
    expect(inputText).toBeInTheDocument();
    const ingredient = screen.getByRole('radio', { name: /ingredient/i });
    expect(ingredient).toBeInTheDocument();
    userEvent.type(inputText, 'honey');
    const buttonSearch = screen.getByTestId('exec-search-btn');
    fireEvent.click(buttonSearch);

    // screen.logTestingPlaygroundURL();
  });
});
