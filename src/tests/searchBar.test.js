import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import { createMemoryHistory } from 'history';
import rootReducer from '../redux/reducers/';
import App from '../App';
import { mockDrinksOne, mockDrinksTwo, mockDrinksThree, mockMealsOne, mockMealsTwo, mockMealsThree } from './searchBarMock';

// import React from 'react';
const INITIAL_STATE = {
  foods: {
    filteredFoods: {
      meals: [],
    },
  },
  drinks: {
    filteredDrinks: {
      drinks: [],
    },
  },
};

const renderWithRouterAndRedux = (
  component,
  initialState = INITIAL_STATE,
  path = '/',
) => {
  // conteudo
  const store = createStore(rootReducer, initialState);
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

describe('testando o componente searchBar, teste básico no /drinks:', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinksOne),
    });
  });

  test('os inputs estão sendo renderizados na tela', async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/drinks');
    const search = screen.getByRole('button', { name: /search/i });

    fireEvent.click(screen.getByRole('radio', { name: /ingredient/i }));

    fireEvent.click(screen.getByRole('radio', { name: /name/i }));
    fireEvent.click(search);
    // fireEvent.click(screen.getByRole('radio', { name: /first letter/i }));
    // fireEvent.click(search);
    // console.log(store.getState());
    await screen.findByText('Mudslinger');
    screen.logTestingPlaygroundURL();
  });
});

describe('testando o componente searchBar, teste básico no /drinks:', () => {
  // teste do primeiro case. envia o mockDrinksTwo para um path descritivo.
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinksTwo),
    });
  });
  
  test('os inputs estão sendo renderizados na tela', () => {
    const { history, store } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/drinks');
    const search = screen.getByRole('button', { name: /search/i });
    fireEvent.click(screen.getByRole('radio', { name: /ingredient/i }));
    fireEvent.click(search);
    
    
  });
});
