import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import { Pokemon } from '../components';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};
const pokemon = pokemons[0];
describe('06. Testa o componente Pokemon.js', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink
    />);
    const { averageWeight, image, name, type } = pokemon;
    const { measurementUnit, value } = averageWeight;

    const pikachu = screen.getByTestId('pokemon-name');
    expect(pikachu.innerHTML).toBe(name);

    const electric = screen.getByTestId('pokemon-type');
    expect(electric.innerHTML).toBe(type);

    const img = screen.getByAltText('Pikachu sprite');
    expect(img.src).toBe(image);

    const howFat = screen.getByTestId('pokemon-weight');
    expect(howFat.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
  });
  test('se o card do pokémon indicado na Pokédex contém um link', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink
    />);
    const { id } = pokemon;
    const link = screen.getByRole('link', { name: /more details/i });
    const url = `/pokemons/${id}`;
    expect(link).toHaveAttribute('href', url);

    userEvent.click(link);
    // const { pathname } = history.location;
    // expect(pathname).toBe(url);
  });
  test('se existe um ícone de estrela nos pokémons favoritados', () => {
    const { name } = pokemon;
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink
      isFavorite
    />);
    const starIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
