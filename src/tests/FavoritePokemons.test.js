import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../pages';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('03. Testa o componente FavoritePokemons.js', () => {
  test('caso não exista Pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavorite = screen.getByText(/No favorite pokemon found/i);

    expect(noFavorite).toBeInTheDocument();
  });
  // test('caso exista apenas um Pokemon favorito', () => {
  //   const charmander = {
  //     id: 4,
  //     name: 'Charmander',
  //     type: 'Fire',
  //     averageWeight: {
  //       value: '8.5',
  //       measurementUnit: 'kg',
  //     },
  //     image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  //     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
  //   };

  //   renderWithRouter(<FavoritePokemons pokemons={ [charmander] } />);

  //   expect(charmander.name).toBeDefined();
  //   expect(charmander.type).toBeDefined();
  // });
});
