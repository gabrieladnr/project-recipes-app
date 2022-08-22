import React from "react";
import { getAllByAltText, getByTestId, render } from "@testing-library/react";
import App from "../App";

describe('Testes do componente Footer', () => {
  it('Testa se o elemento contendo o footer está presente na tela', () => {
    const { getByTestId } = render(
      <App />
    )

    const footerComponent = getByTestId('footer')
    expect(footerComponent).toBeInTheDocument();
  })
  it('Os ícones de comida de bebidas estão presentes na tela', () => {
    const { getByAltText } = render(
      <App />
    )

    const foodImg = getByAltText('foodImage')
    const drinkImg = getByAltText('drinkImage')

    expect(foodImg).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();

  });
  it('os botões para redirecionamento para receitas de comidas e bebidas estão presentes na tela', () => {
    const { getByTestId } = render(
      <App />
    )

    const foodBtn = getByTestId('food-bottom-btn');
    const drinkBtn = getByTestId('drinks-bottom-btn');

    expect(foodBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();

  })
});
