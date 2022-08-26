import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import Recipes from '../components/Recipes';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
// import meals from '../../cypress/mocks/meals';

// screen.logTestingPlayground()

// jest.spyOn(global, 'fetch').mockResolvedValue({
//   json: jest.fn().mockResolvedValue(meals),
// });

// jest.spyOn(global, 'fetch').mockImplementation(async (url) => {
//   if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
//     return {
//       json: async () => meals,
//     };
//   }
// });

const BeefCategoryFilter = 'Beef-category-filter';
const drinksBtn = 'drinks-bottom-btn';
const foodsBtn = 'food-bottom-btn';
const history = createMemoryHistory({ initialEntries: ['/foods'] });
describe('Testa o funcionamento da tela de receitas, verificando se:', () => {
  test('a rota é /foods ao ser redirecionado após o Login', () => {
    renderWithRouter(<Recipes history={ history } />);
    expect(history.location.pathname).toBe('/foods');
  });

  test('são exibidos 12 cards de receitas no load inicial da página', async () => {
    renderWithRouter(<Recipes history={ history } />);
    const firstcardName = await screen.findByTestId('0-card-name');
    const lastcardName = await screen.findByTestId('11-card-name');
    const firstcardImg = await screen.findByTestId('0-recipe-card');
    const lastcardImg = await screen.findByTestId('11-recipe-card');
    expect(firstcardImg).toBeVisible();
    expect(lastcardImg).toBeVisible();
    expect(firstcardName).toBeVisible();
    expect(lastcardName).toBeVisible();
  });

  test('o footer com links para Drinks e Foods é exibido na página', () => {
    renderWithRouter(<Recipes history={ history } />);
    const footer = screen.getByTestId('footer');
    const foodsFooterBtn = screen.getByTestId(foodsBtn);
    const drinksFooterBtn = screen.getByTestId(drinksBtn);
    expect(footer).toBeVisible();
    expect(foodsFooterBtn).toBeVisible();
    expect(drinksFooterBtn).toBeVisible();
  });

  test('são exibidas as primeiras cinco categorias de comidas', async () => {
    renderWithRouter(<Recipes history={ history } />);

    const BeefCategory = await screen.findByTestId(BeefCategoryFilter);
    const BreakfastCategory = await screen.findByTestId('Breakfast-category-filter');
    const ChickenCategory = await screen.findByTestId('Chicken-category-filter');
    const DessertCategory = await screen.findByTestId('Dessert-category-filter');
    const GoatCategory = await screen.findByTestId('Goat-category-filter');
    expect(BeefCategory).toBeVisible();
    expect(BreakfastCategory).toBeVisible();
    expect(ChickenCategory).toBeVisible();
    expect(DessertCategory).toBeVisible();
    expect(GoatCategory).toBeVisible();
  });

  test('ao clicar em uma categoria de comida são exibidas receitas', async () => {
    renderWithRouter(<Recipes history={ history } />);
    const foodsFooterBtn = screen.getByTestId(foodsBtn);
    userEvent.click(foodsFooterBtn);

    const BeefCategory = await screen.findByTestId(BeefCategoryFilter);

    userEvent.click(BeefCategory);
    const beefRecipe = await screen.findByText(/beef and mustard pie/i);
    expect(beefRecipe).toBeVisible();
  });

  test('ao clicar em All são exibidas receitas de todas as categorias', async () => {
    renderWithRouter(<Recipes history={ history } />);

    const btnAll = await screen.findByRole('button', {
      name: /all/i,
    });
    userEvent.click(btnAll);
    const vegRecipe = await screen.findByText(/corba/i);
    const beefRecipe = await screen.findByText(/big mac/i);
    expect(vegRecipe).toBeVisible();
    expect(beefRecipe).toBeVisible();
  });

  test('ao clicar novamente em uma categoria são exibidas receitas gerais', async () => {
    renderWithRouter(<Recipes history={ history } />);

    const foodsFooterBtn = screen.getByTestId(foodsBtn);
    userEvent.click(foodsFooterBtn);

    const BeefCategory = await screen.findByTestId(BeefCategoryFilter);
    userEvent.click(BeefCategory);

    const beefRecipe = await screen.findByText(/beef and mustard pie/i);
    expect(beefRecipe).toBeVisible();

    userEvent.click(BeefCategory);

    const desertRecipe = await screen.findByText(/timbits/i);
    expect(desertRecipe).toBeVisible();
  });

  test('ao clicar na receita da categ o user é redirecionado para detalhes', async () => {
    renderWithRouter(<Recipes history={ history } />);

    const BeefCategory = await screen.findByTestId(BeefCategoryFilter);
    userEvent.click(BeefCategory);

    const beefRecipe = await screen.findByText(/beef and mustard pie/i);
    expect(beefRecipe).toBeVisible();
    userEvent.click(beefRecipe);
    expect(history.location.pathname).toBe('/foods/52874');
  });

  // problema de lint aqui, não soube resolver
  test('ao clicar na receita o user é redirect p/ detalhes da receita', async () => {
    const history = createMemoryHistory({ initialEntries: ['/foods'] });
    renderWithRouter(<Recipes history={ history } />);

    const vegRecipe = await screen.findByRole('button', {
      name: /card-thumb burek/i,
    });
    userEvent.click(vegRecipe);
    expect(history.location.pathname).toBe('/foods/53060');
  });
});
