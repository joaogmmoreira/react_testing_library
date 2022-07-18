import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { About } from '../pages';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('02. Testa o componente About.js', () => {
  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const pokeText = screen.getByRole('heading', { name: /About Pokédex/i });

    expect(pokeText).toBeDefined();
  });
  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(/This application simulates/i);
    const secondParagraph = screen.getByText(/One can filter /i);

    expect(firstParagraph).toBeDefined();
    expect(secondParagraph).toBeDefined();
  });
  test('se a página contém contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img');
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImg.src).toBe(imgURL);
  });
});
