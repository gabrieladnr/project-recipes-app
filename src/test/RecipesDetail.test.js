// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando o componente <FoodDetail />', () => {
  it('Renderição é feiota corretamente', () => {
    const { history } = renderWithRouterAndRedux(App);
    history.push();
  });
});
