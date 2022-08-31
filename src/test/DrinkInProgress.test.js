import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';

jest.mock('clipboard-copy');
const drinkPath = '/drinks/178319/in-progress';
const favPath = '/favorite-recipes';

describe('Testa o componente DrinksInProgress', () => {
  beforeEach(() => {
    global.fetch = async (url) => {
      // console.log(url);
      switch (url) {
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
        return {
          json: jest.fn().mockResolvedValue(drinks),
        };
      case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
        return {
          json: jest.fn().mockResolvedValue(drinkCategories),
        };
      case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319':
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
  test('Testa se ao clicar no botão share ele exibe uma mensagem', async () => {
    renderWithRouterAndRedux(<App />, drinkPath);

    copy.mockResolvedValue({});

    const buttonShare = await screen.findByTestId('share-btn');
    userEvent.click(buttonShare);

    const copiedText = await screen.findByTestId('link-copied');
    expect(copiedText).toBeVisible();
  });

  it('Testa o funcionamento dos checkbox de ingredientes', async () => {
    renderWithRouterAndRedux(<App />, drinkPath);
    const ingredient1 = await screen.findByTestId('0-checkbox');
    userEvent.click(ingredient1);
    expect(ingredient1).toBeInTheDocument();
    expect(ingredient1).toBeChecked();
    userEvent.click(ingredient1);
    expect(ingredient1).not.toBeChecked();

    const finalizarBtn = await screen.findByRole('button',
      { name: /finalizar receita/i });

    expect(finalizarBtn).toBeDisabled();
  });

  it('Testa ao concluir a receita o botão de "finalizar" esta habilitado', async () => {
    renderWithRouterAndRedux(<App />, drinkPath);
    // screen.logTestingPlaygroundURL();

    const ingredient1 = await screen.findByTestId('0-checkbox');
    const ingredient2 = await screen.findByTestId('1-checkbox');
    const ingredient3 = await screen.findByTestId('2-checkbox');

    expect(ingredient1).toBeVisible();
    expect(ingredient2).toBeVisible();
    expect(ingredient3).toBeVisible();

    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);

    const finalizarBtn = await screen.findByRole('button',
      { name: /finalizar receita/i });

    expect(finalizarBtn).not.toBeDisabled();
    userEvent.click(finalizarBtn);
  });

  // it('Testa o redirecionamento ao clicar no botão de "finalizar"', async () => {
  //   renderWithRouterAndRedux(<App />, drinkPath);
  //   const ingredient1 = await screen.findByTestId('0-ingredient-step');
  //   const ingredient2 = await screen.findByTestId('1-ingredient-step');
  //   const ingredient3 = await screen.findByTestId('2-ingredient-step');

  //   expect(ingredient1).toBeVisible();
  //   expect(ingredient2).toBeVisible();
  //   expect(ingredient3).toBeVisible();

  //   userEvent.click(ingredient1);
  //   userEvent.click(ingredient2);
  //   userEvent.click(ingredient3);

  //   const finalizarBtn = await screen.findByRole('button',
  //     { name: /finalizar receita/i });

  //   userEvent.click(finalizarBtn);

  //   const title = await screen.findByText(/done recipes/i);
  //   expect(title).toBeVisible();
  // });
  it('Verifica se é possível favoritar a receita', async () => {
    renderWithRouterAndRedux(<App />, drinkPath);

    const favBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favBtn);

    renderWithRouterAndRedux(<App />, favPath);
    const recipeName = await screen.findAllByText(/aquamarine/i);
    const recipeNameApearsTimes = 2;
    expect(recipeName).toHaveLength(recipeNameApearsTimes);
  });
});

// it('Testa ', async () => {
//   renderWithRouterAndRedux(<App />, '/drinks');
// });
