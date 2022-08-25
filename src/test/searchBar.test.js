import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import store from '../redux/store';
import oneDrink from '../../cypress/mocks/oneDrink';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';

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

    const test = await screen.findAllByText(/Figgy Thyme/i);
    expect(test).toBeInTheDocument();
    expect().toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });
  /* Figgy Thyme

card-thumb
Honey Bee

card-thumb
Hot Toddy

card-thumb
Melya

card-thumb
Scottish Highland Liqueur

card-thumb
Strawberry Shivers

card-thumb
Sweet Bananas */
  /* test('Testa se dá para alterar o input de texto', () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const search = screen.getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    fireEvent.click(search);
    const inputText = screen.getByTestId('search-input');
    expect(inputText).toBeInTheDocument();
    const ingredient = screen.getByRole('radio', { name: /ingredient/i });
    expect(ingredient).toBeInTheDocument();
    const firstLetter = screen.getByRole('radio', { name: /first letter/i });
    expect(firstLetter).toBeInTheDocument();
    const name = screen.getByRole('radio', { name: /name/i });
    expect(name).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });
  test('Testa se dá para alterar o input de texto', () => {
    renderWithRouterAndRedux(<App />, '/drinks');
    const search = screen.getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    fireEvent.click(search);
    const inputText = screen.getByTestId('search-input');
    expect(inputText).toBeInTheDocument();
    const ingredient = screen.getByRole('radio', { name: /ingredient/i });
    expect(ingredient).toBeInTheDocument();
    const firstLetter = screen.getByRole('radio', { name: /first letter/i });
    expect(firstLetter).toBeInTheDocument();
    const name = screen.getByRole('radio', { name: /name/i });
    expect(name).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  }); */
});

/* // teste /drinks : name, retorno apenas 1 objeto.
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
    });
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
    });
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
}); */
