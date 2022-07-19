import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('04. Testa o componente NotFound.js', () => {
  test('se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFound = screen.getByRole('heading', { name: /Page requested not found/i });

    expect(notFound).toBeInTheDocument();
  });
  test('se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const cryingImg = screen.getByAltText(/Pikachu crying because the page/i);
    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(cryingImg.src).toBe(imgURL);
  });
});
