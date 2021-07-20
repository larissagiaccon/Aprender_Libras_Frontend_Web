import styled, { keyframes } from 'styled-components';

import backgroundImg from '../../assets/background.jpg';
import letrasImg from '../../assets/letras.svg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 43.75rem;

  background: url(${letrasImg});
  background-repeat: no-repeat;
  background-size: cover;
`;

const apperFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-3.125rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${apperFromLeft} 1s;

  h2 {
    font-size: 4rem;
    font-family: 'Schoolbell', sans-serif;
    color: var(--orange);

    &:first-child {
      /* border-bottom: 0.075rem solid var(--gray_300); */
    }
  }

  form {
    margin: 5rem 0;
    width: 21.25rem;
    text-align: center;

    h1 {
      margin-bottom: 1.5rem;
    }

    a {
      color: var(--white_gray);
      display: block;
      margin-top: 1.5rem;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: var(--shade_white_gray);
      }
    }
  }

  > a {
    color: var(--orange);
    display: block;
    margin-top: 1.5rem;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      color: var(--shade_orange);
    }

    svg {
      margin-right: 1rem;
    }
  }
`;

const apperFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(3.125rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Background = styled.div`
  flex: 1;
  animation: ${apperFromRight} 1s;
  background: url(${backgroundImg}) no-repeat center; //https://www.pexels.com/pt-br/foto/negocio-empresa-computador-conferencia-4226256/
  background-size: cover;
`;
