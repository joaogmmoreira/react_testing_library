import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import { Pokedex } from '../pages';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

const isPokemonFavoriteById = { 4: false };

describe('05. Testa o componente Pokedex.js', () => {
  test('se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i,
      level: 2 });

    expect(heading).toBeDefined();
  });
  test('se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemon = screen.getAllByTestId('next-pokemon');

    expect(pokemon).toHaveLength(1);
  });
  test('se existe um botão de filtragem para cada tipo de pokémon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const types = pokemons.map((element) => element.type);
    const unique = (value, index, self) => self.indexOf(value) === index;
    const uniqueTypes = types.filter(unique);

    expect(typeButtons).toHaveLength(uniqueTypes.length);
  });
  test('se selecionando um tipo, a Pokédex deve circular'
    + ' somente pelos pokémons daquele tipo;', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const fireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireButton);

    const pokemonType = screen.getByTestId('pokemon-type');

    expect(pokemonType.innerText).toBe(fireButton.innerText);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(nextButton);

    expect(pokemonType.innerText).toBe(fireButton.innerText);

    const allButton = screen.getByRole('button', { name: /all/i });

    userEvent.click(allButton);

    expect(pokemonType).toBeInTheDocument();
  });
  test('se o botão All esté sempre visível', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const allButton = screen.getByRole('button', { name: /all/i });

    expect(allButton).toBeDefined();
  });
  // test('se é exibido o próximo pokémon da lista'
  //  + ' quando o botão Próximo pokémon é clicado', () => {
  //   renderWithRouter(<Pokedex
  //     pokemons={ pokemons }
  //     isPokemonFavoriteById={ isPokemonFavoriteById }
  //   />);

  //   const pokemon1 = screen.getByRole('button', { name: 'Próximo pokémon' });

  //   expect(pokemon1).toBeDefined();

  //   const nextBtn = screen.getByTestId('next-pokemon');

  //   expect(nextBtn).toBeDefined();

  //   userEvent.click(nextBtn);
  // });
});
