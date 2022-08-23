import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import { createMemoryHistory } from 'history';
import rootReducer from '../redux/reducers/';
import App from '../App';
import { mockDrinksOne, mockDrinksTwo, mockDrinksThree, mockMealsOne, mockMealsTwo, mockMealsThree } from './searchBarMock';
import store from '../redux/store';

const renderWithRouterAndRedux = (
  component,
  path = '/',
) => {
  // conteudo
  
  const history = createMemoryHistory({ initialEntries: [path] });
  return {
    // caralho aquatico
    ...render(
      <Provider store={ store }>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    history,
    store,
  };
};

// TESTANDO DRINKS
// teste /drinks : ingredientes, retorno +1 objeto.
describe('testando o componente searchBar, teste básico no /drinks:', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinksOne),
    });
  });

  test('os inputs estão sendo renderizados na tela', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const search = screen.getByRole('button', { name: /search/i });
    fireEvent.click(screen.getByRole('radio', { name: /ingredient/i }));
    fireEvent.click(search);
    // fireEvent.click(screen.getByRole('radio', { name: /first letter/i }));
    // fireEvent.click(search);
    // console.log(store.getState());
    await screen.findAllByText('Mudslinger');
  });
});
// teste /drinks : name, retorno apenas 1 objeto.
describe('testando o componente searchBar, teste básico no /drinks:', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinksTwo),
    });
  });
  
  test('os inputs estão sendo renderizados na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/drinks');
    const search = screen.getByRole('button', { name: /search/i });
    fireEvent.click(screen.getByRole('radio', { name: /name/i }));
    fireEvent.click(search);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/12518');
    })
  });
});
// teste /drinks : first letter mais de 1 objeto.
describe('testando o componente searchBar, teste básico no /drinks:', () => {
  // teste do primeiro case. envia o mockDrinksTwo para um path descritivo.
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinksThree),
    });
  });
  
  test('os inputs estão sendo renderizados na tela', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const search = screen.getByRole('button', { name: /search/i });
    fireEvent.click(screen.getByRole('radio', { name: /first letter/i }));
    userEvent.type(screen.getByTestId('search-input'), 'a');
    fireEvent.click(search);
    await screen.findByText('Quentin');
  });
});
// teste quando retorno for array vazio
describe('testando o componente searchBar, teste básico no /drinks:', () => {
  // teste do primeiro case. envia o mockDrinksTwo para um path descritivo.
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: null }),
    });
  });
  
  test('os inputs estão sendo renderizados na tela', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const search = screen.getByRole('button', { name: /search/i });
    fireEvent.click(screen.getByRole('radio', { name: /first letter/i }));
    userEvent.type(screen.getByTestId('search-input'), 'a');
    fireEvent.click(search);
  });
});

// TESTANDO FOODS
// teste /foods : ingredientes, retorno 1 objeto
describe('testando o componente searchBar, teste básico no /drinks:', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealsOne),
    });
  });

  test('os inputs estão sendo renderizados na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/foods');
    const search = screen.getByRole('button', { name: /search/i });
    fireEvent.click(screen.getByRole('radio', { name: /ingredient/i }));
    fireEvent.click(search);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52965');
    })
  });
});
// teste /foods : name, retorno +1 objeto
describe('testando o componente searchBar, teste básico no /foods:', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealsTwo),
    });
  });
  
  test('os inputs estão sendo renderizados na tela', async () => {
    renderWithRouterAndRedux(<App />, '/foods');
    const search = screen.getByRole('button', { name: /search/i });
    fireEvent.click(screen.getByRole('radio', { name: /name/i }));
    fireEvent.click(search);
    await screen.findAllByText('Pad See Ew');
  });
});
// teste /foods : first letter retorno +1 objeto
describe('testando o componente searchBar, teste básico no /foods:', () => {
  // teste do primeiro case. envia o mockDrinksTwo para um path descritivo.
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealsThree),
    });
  });
  
  test('os inputs estão sendo renderizados na tela', async () => {
    renderWithRouterAndRedux(<App />, '/foods');
    const search = screen.getByRole('button', { name: /search/i });
    fireEvent.click(screen.getByRole('radio', { name: /first letter/i }));
    fireEvent.click(search);
    userEvent.type(screen.getByTestId('search-input'), 'a');
    fireEvent.click(search);
    await screen.findByText('White chocolate creme brulee');
  });
});
// teste /foods : first letter quando retorno for array vazio
describe('testando o componente searchBar, teste básico no /foods:', () => {
  // teste do primeiro case. envia o mockDrinksTwo para um path descritivo.
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: null }),
    });
  });
  
  test('os inputs estão sendo renderizados na tela', async () => {
    renderWithRouterAndRedux(<App />, '/foods');
    const search = screen.getByRole('button', { name: /search/i });
    fireEvent.click(screen.getByRole('radio', { name: /first letter/i }));
    fireEvent.click(search);
    userEvent.type(screen.getByTestId('search-input'), 'a');
    fireEvent.click(search);
  });
});

