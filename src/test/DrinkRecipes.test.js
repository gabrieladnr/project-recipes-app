import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import Recipes from '../components/Recipes';
import renderWithRouter from './helpers/renderWithRouterAndRedux';

const history = createMemoryHistory({ initialEntries: ['/foods'] });
const drinksBtn = 'drinks-bottom-btn';
const foodsBtn = 'food-bottom-btn';
const CocoaCateg = 'Cocoa-category-filter';

describe('Testa o funcionamento da tela de receitas de drinks, verificando se:', () => {
  test('a rota é /foods ao ser redirecionado após o Login', () => {
    renderWithRouter(<Recipes history={ history } />);
    expect(history.location.pathname).toBe('/foods');
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

  test('ao clicar em Drinks, são exibidos 12 cards de receitas de drinks', async () => {
    renderWithRouter(<Recipes history={ history } />);
    const drinksFooterBtn = screen.getByTestId(drinksBtn);
    expect(drinksFooterBtn).toBeVisible();
    userEvent.click(drinksFooterBtn);

    const firstcardName = await screen.findByTestId('0-card-name');
    const lastcardName = await screen.findByTestId('11-card-name');
    const firstcardImg = await screen.findByTestId('0-card-img');
    const lastcardImg = await screen.findByTestId('11-card-img');
    expect(firstcardImg).toBeVisible();
    expect(lastcardImg).toBeVisible();
    expect(firstcardName).toBeVisible();
    expect(lastcardName).toBeVisible();
  });

  test('são exibidas as primeiras cinco categorias de drinks', async () => {
    renderWithRouter(<Recipes history={ history } />);
    const drinksFooterBtn = screen.getByTestId(drinksBtn);
    userEvent.click(drinksFooterBtn);

    const OrdinaryCateg = await screen.findByTestId('Ordinary Drink-category-filter');
    const CocktailCategory = await screen.findByTestId('Cocktail-category-filter');
    const ShakeCategory = await screen.findByTestId('Shake-category-filter');
    const OtherCategory = await screen.findByTestId('Other/Unknown-category-filter');
    const CocoaCategory = await screen.findByTestId(CocoaCateg);
    expect(OrdinaryCateg).toBeVisible();
    expect(CocktailCategory).toBeVisible();
    expect(ShakeCategory).toBeVisible();
    expect(OtherCategory).toBeVisible();
    expect(CocoaCategory).toBeVisible();
  });

  test('ao clicar em All são exibidas receitas de todas as categorias', async () => {
    renderWithRouter(<Recipes history={ history } />);

    const btnAll = await screen.findByRole('button', {
      name: /all/i,
    });
    userEvent.click(btnAll);

    const adamRecipe = await screen.findByText(/adam/i);
    expect(adamRecipe).toBeVisible();
  });

  test('ao clicar novamente em uma categoria são exibidas receitas gerais', async () => {
    renderWithRouter(<Recipes history={ history } />);
    const drinksFooterBtn = screen.getByTestId(drinksBtn);
    userEvent.click(drinksFooterBtn);

    const CocoaCategory = await screen.findByTestId(CocoaCateg);
    userEvent.click(CocoaCategory);
    const cocoaRecipe = await screen.findByText(/chocolate drink/i);
    expect(cocoaRecipe).toBeVisible();

    userEvent.click(CocoaCategory);
    const adamRecipe = await screen.findByText(/adam/i);
    expect(adamRecipe).toBeVisible();
  });

  test('ao clicar em uma categoria de bebida são exibidas receitas', async () => {
    renderWithRouter(<Recipes history={ history } />);
    const CocktailCategory = await screen.findByTestId('Cocktail-category-filter');

    userEvent.click(CocktailCategory);
    const a1Recipe = await screen.findByText(/a1/i);
    expect(a1Recipe).toBeVisible();
  });
  test('ao clicar na receita da categ o user é redirecionado para detalhes', async () => {
    renderWithRouter(<Recipes history={ history } />);

    const CocktailCategory = await screen.findByTestId('Cocktail-category-filter');
    userEvent.click(CocktailCategory);

    const a1Recipe = await screen.findByText(/a1/i);
    expect(a1Recipe).toBeVisible();
    userEvent.click(a1Recipe);
    expect(history.location.pathname).toBe('/drinks/17222');
  });
  test('ao clicar na receita o user é redirecionado para detalhes', async () => {
    const history = createMemoryHistory({ initialEntries: ['/drinks'] });
    renderWithRouter(<Recipes history={ history } />);

    const adamRecipe = await screen.findByText(/adam/i);
    expect(adamRecipe).toBeVisible();
    userEvent.click(adamRecipe);
    expect(history.location.pathname).toBe('/drinks/17837');
  });
});
