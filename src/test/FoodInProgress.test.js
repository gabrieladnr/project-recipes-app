import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';

jest.mock('clipboard-copy');
const foodPath = '/foods/52771/in-progress';
const favPath = '/favorite-recipes';

describe('Testa o componente FoodInProgress', () => {
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
      case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771':
        return {
          json: jest.fn().mockResolvedValue(oneMeal),
        };
      default:
        return {
          json: jest.fn().mockResolvedValue({ drinks: [], meals: [] }),
        };
      }
    };
  });
  test('Testa se ao clicar no botão share ele exibe uma mensagem', async () => {
    renderWithRouterAndRedux(<App />, foodPath);

    copy.mockResolvedValue({});

    const buttonShare = await screen.findByTestId('share-btn');
    userEvent.click(buttonShare);

    const copiedText = await screen.findByTestId('link-copied');
    expect(copiedText).toBeVisible();
  });

  it('Testa o funcionamento dos checkbox de ingredientes', async () => {
    renderWithRouterAndRedux(<App />, foodPath);
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
    renderWithRouterAndRedux(<App />, foodPath);
    // screen.logTestingPlaygroundURL();

    const ingredient1 = await screen.findByTestId('0-checkbox');
    const ingredient2 = await screen.findByTestId('1-checkbox');
    const ingredient3 = await screen.findByTestId('2-checkbox');
    const ingredient4 = await screen.findByTestId('3-checkbox');
    const ingredient5 = await screen.findByTestId('4-checkbox');
    const ingredient6 = await screen.findByTestId('5-checkbox');
    const ingredient7 = await screen.findByTestId('6-checkbox');
    const ingredient8 = await screen.findByTestId('7-checkbox');

    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);
    userEvent.click(ingredient4);
    userEvent.click(ingredient5);
    userEvent.click(ingredient6);
    userEvent.click(ingredient7);
    userEvent.click(ingredient8);

    const finalizarBtn = await screen.findByRole('button',
      { name: /finalizar receita/i });

    expect(finalizarBtn).not.toBeDisabled();
    userEvent.click(finalizarBtn);
  });

  it('Verifica se é possível favoritar a receita', async () => {
    renderWithRouterAndRedux(<App />, foodPath);

    const favBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favBtn);

    renderWithRouterAndRedux(<App />, favPath);
    const recipeName = await screen.findAllByText(/spicy arrabiata penne/i);
    const recipeNameApearsTimes = 2;
    expect(recipeName).toHaveLength(recipeNameApearsTimes);
  });
});

// it('Testa ', async () => {
//   renderWithRouterAndRedux(<App />, '/drinks');
// });
