import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
// MOCKS DO CYPRESS PARA NÃO PRECISAR MONTAR OS MODULES:
import drinks from '../../cypress/mocks/drinks';
import oneMeal from '../../cypress/mocks/oneMeal';
import mealCategories from '../../cypress/mocks/mealCategories';
import favoriteRecipes from './helpers/favoritesLocalStorage';
import meals from '../../cypress/mocks/meals';
// TESTANDO FOODS
const firstLetter = 'first-letter-search-radio';
const searchInput = 'search-input';
const exec = 'exec-search-btn';
describe('teste /foods: name, retorno apenas 1 objeto:', () => {
  beforeEach(() => {
    localStorage.clear();
    window.alert = () => console.log('alert');
    global.fetch = async (url) => {
      switch (url) {
      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
        return {
          json: jest.fn().mockResolvedValue(drinks),
        };
      case 'https://www.themealdb.com/api/json/v1/1/search.php?f=m':
      case 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Meals':
      case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
        return {
          json: jest.fn().mockResolvedValue(meals),
        };
      case 'https://www.themealdb.com/api/json/v1/1/search.php?s=oneMeal':
      case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52769':
      case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771':
        return {
          json: jest.fn().mockResolvedValue(oneMeal),
        };
      case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
        return {
          json: jest.fn().mockResolvedValue(mealCategories),
        };
      default:
        return {
          json: jest.fn().mockResolvedValue({ meals: [] }),
        };
      }
    };
  });

  // 1.2 - Testando na página de meals Quando pesquisamos e a requisição traz apenas 1 meal
  test('Testa meals e alteração de página', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { history } = renderWithRouterAndRedux(<App />, '/foods');
    // Renderizando a tela. Agora clicamos na lupa para aparecer a barra de pesquisa
    const search = screen.getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    // preenchendo a barra de pesquisa
    userEvent.type(screen.getByTestId(searchInput), 'oneMeal');
    // selecionando o tipo de pesquisa NAME
    userEvent.click(screen.getByRole('radio', { name: /name/i }));
    // fazendo a requisição
    userEvent.click(screen.getByTestId(exec));

    // espero que a rota tenha sido alterada para FoodDetails
    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52771');
    });
    screen.getByRole('heading', { name: /Spicy Arrabiata Penne/i });

    // 2.2 - TESTANDO O COMPONENTE Food Details
    const start = screen.getByRole('button', { name: /start recipe/i });
    const favorite = screen.getByRole('img', { name: /true/i });

    userEvent.click(favorite);
    userEvent.click(favorite);

    userEvent.click(start);
    // espero que a rota tenha sido alterada para foods/:id/in-progress
    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52771/in-progress');
    });
  });
  // 3.1 - Testando na página de drinks Quando pesquisamos mais de 12 drinks
  test('Testando se exibe apenas 12 meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/foods');
    // A partir da segunda Renderização, não vamos precisar clicar na lupinha
    // preenchendo a barra de pesquisa
    userEvent.type(screen.getByTestId(searchInput), 'Meals');
    // selecionando o tipo de pesquisa INGREDIENTE
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    // fazendo a requisição
    userEvent.click(screen.getByTestId(exec));
    await waitFor(() => {
      screen.getByTestId('9-recipe-card');
    });

    // Clicamos na imagem para ir para a página de drink Details:
    userEvent.click(screen.getByTestId('9-recipe-card'));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52769');
    });
  });

  test('Testando se exibe apenas 12 meals', () => {
    renderWithRouterAndRedux(<App />, '/foods');
    // preenchendo a barra de pesquisa
    userEvent.type(screen.getByTestId(searchInput), 'm');
    // selecionando o tipo de pesquisa INGREDIENTE
    userEvent.click(screen.getByTestId(firstLetter));
    // fazendo a requisição
    userEvent.click(screen.getByTestId(exec));
  });
});
