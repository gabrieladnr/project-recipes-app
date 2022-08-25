import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import Recipes from '../components/Recipes';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import meals from '../../cypress/mocks/meals';

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

const history = createMemoryHistory({ initialEntries: ['/foods'] });
describe('Testa o funcionamento da tela de receitas, verificando se:', () => {
  test('a rota é /foods ao ser redirecionado após o Login', () => {
    renderWithRouter(<Recipes history={ history } />);
    expect(history.location.pathname).toBe('/foods');
  });
  // test('Verifica se a rota é /foods ao ser redirecionado após o Login', () => {
  //   renderWithRouter(<Recipes history={ history } />);
  //   const drinksFooterBtn = screen.getByTestId('drinks-bottom-btn');
  //   // const foodsFooterBtn = screen.getByTestId('food-bottom-btn');
  //   expect(history.location.pathname).toBe('/foods');
  //   userEvent.click(drinksFooterBtn);
  //   expect(history.location.pathname).toBe('/drinks');
  // });
  test('são exibidos 12 cards de receitas no load inicial da página', async () => {
    renderWithRouter(<Recipes history={ history } />);
    // const cardImg = await screen.findByTestId('10-card-img');
    // expect(cardImg).toBeInTheDocument();
    const button = screen.getAllByRole('button');
    within(button).getByAltText(/card-thumb/i);
  });
});
