import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import store from '../../redux/store/index';

// 35-38,101,135

const renderWithRouterAndRedux = (
  component,
  path = '/',
) => {
  // conteudo

  const history = createMemoryHistory({ initialEntries: [path] });
  return {
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

export default renderWithRouterAndRedux;
