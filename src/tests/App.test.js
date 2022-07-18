import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('01. Testa o componente App.js', () => {
  test('se no topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /Home/i });
    const about = screen.getByRole('link', { name: /About/i });
    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });
  test('se a aplicação é redirecionada para home é clicado', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });

    userEvent.click(home);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  test('se a aplicação é redirecionada para about quando clicado', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });

    userEvent.click(about);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });
  test('se a aplicação é redirecionada para favorite pokemons quando clicado', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    userEvent.click(favorite);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
  test('se a aplicação é redirecionada para not found quando alguém zuar', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/not-defined');

    expect(/Page requested not found/i).toBeDefined();
  });
});
