import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
// MOCKS DO CYPRESS PARA NÃO PRECISAR MONTAR OS MODULES:
import oneDrink from '../../cypress/mocks/oneDrink';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';
import favoriteRecipes from './helpers/favoritesLocalStorage';
import meals from '../../cypress/mocks/meals';
// TESTANDO DRINKS
const firstLetter = 'first-letter-search-radio';
const searchInput = 'search-input';
const exec = 'exec-search-btn';

describe('teste /drinks: name, retorno apenas 1 objeto:', () => {
  beforeEach(() => {
    localStorage.clear();
    window.alert = () => console.log('alert');
    global.fetch = async (url) => {
      switch (url) {
      case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Drinks':
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
        return {
          json: jest.fn().mockResolvedValue(drinks),
        };
      case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
        return {
          json: jest.fn().mockResolvedValue(meals),
        };
      case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
        return {
          json: jest.fn().mockResolvedValue(drinkCategories),
        };
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=c':
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=oneDrink':
      case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319':
      case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15853':
      case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=14610':
        return {
          json: jest.fn().mockResolvedValue(oneDrink),
        };
      default:
        return {
          json: jest.fn().mockResolvedValue({ drinks: [] }),
        };
      }
    };
  });

  // 1.1 - Testando na página de drinks Quando pesquisamos e a requisição traz 1 drink
  test('Teste drinks e alteração da página', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { history } = renderWithRouterAndRedux(<App />, '/drinks');
    // Renderizando a tela. Agora clicamos na lupa para aparecer a barra de pesquisa
    const search = screen.getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    userEvent.click(search);
    // Fizemos o click. Agora precisamos preencher os input's.
    // escrevendo 'oneDrink' na searchBar
    userEvent.type(screen.getByTestId(searchInput), 'oneDrink');
    // selecionando o tipo de pesquisa NAME
    userEvent.click(screen.getByRole('radio', { name: /name/i }));
    userEvent.click(screen.getByTestId(exec));

    // A rota deve ter sido alterada para DrinkDetails
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });
    screen.getByRole('heading', { name: /aquamarine/i });

    // 2.1 - TESTANDO O COMPONENTE Drink Details
    const start = screen.getByRole('button', { name: /start recipe/i });
    const favorite = screen.getByRole('img', { name: /true/i });

    userEvent.click(favorite);
    userEvent.click(favorite);
    userEvent.click(start);
    // espero que a rota tenha sido alterada para foods/:id/in-progress
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319/in-progress');
    });
    history.goBack();
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });

  // 3.1 - Testando na página de drinks Quando pesquisamos mais de 12 drinks
  test('Testando se exibe apenas 12 drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/drinks');
    // A partir da segunda Renderização, não vamos precisar clicar na lupinha
    // preenchendo a barra de pesquisa
    userEvent.type(screen.getByTestId(searchInput), 'Drinks');
    // selecionando o tipo de pesquisa INGREDIENTE
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    // fazendo a requisição
    userEvent.click(screen.getByTestId(exec));
    await waitFor(() => {
      screen.getByTestId('11-recipe-card');
    });

    userEvent.type(screen.getByTestId(searchInput), 'Drinks');
    // selecionando o tipo de pesquisa INGREDIENTE
    userEvent.click(screen.getByTestId(firstLetter));
    // fazendo a requisição
    userEvent.click(screen.getByTestId(exec));

    // Clicamos na imagem para ir para a página de drink Details:
    userEvent.click(screen.getByTestId('11-recipe-card'));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/15853');
    });
  });

  test('Testando se exibe apenas 12 drinks', () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    // A partir da segunda Renderização, não vamos precisar clicar na lupinha
    // preenchendo a barra de pesquisa
    userEvent.type(screen.getByTestId(searchInput), 'c');
    // selecionando o tipo de pesquisa INGREDIENTE
    userEvent.click(screen.getByTestId(firstLetter));
    // fazendo a requisição
    userEvent.click(screen.getByTestId(exec));
  });
});
