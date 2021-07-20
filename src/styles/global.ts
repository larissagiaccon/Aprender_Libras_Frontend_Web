import { shade } from 'polished';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

    body {
      background: var(--gray_400);
      color: var(--white);
      -webkit-font-smoothing: antialiased;
    }

    body, input, button {
      font-family: 'Roboto Slab', serif;
      font-size: 1rem;
    }

    h1, h2, h3, h4, h5, h6, strong {
      font-weight: 500;
    }

    button {
      cursor: pointer;
    }
  }

  // Responsivo
  html {
    font-size: 100%;

    @media (max-width: 1080px) {
      font-size: 58%;
    }

    @media (max-width: 720px) {
      font-size: 54%;
    }

    @media (max-width: 425px) {
      font-size: 48%;
    }

    @media (max-width: 320px) {
      font-size: 44%;
    }
  }

  :root {
    --red_200: #C53030;
    --red_100: #FDDEDE;

    --orange: #FF9000;

    --green_400: #008000;
    --green_300: #2E656A;
    --green_200: #04D361;
    --green_100: #E6FFFA;

    --blue_200: #3172B7;
    --blue_100: #EBF8FF;

    --black: #000000;

    --gray_600: #232129;
    --gray_500: #28262E;
    --gray_400: #312E38;
    --gray_300: #3E3B47;
    --gray_200: #666360;
    --gray_100: #999591;

    --white_gray: #F4EdE8;
    --white: #FFFFFF;

    --shade_orange: ${shade(0.2, '#FF9000')};
    --shade_orange_1: ${shade(0.1, '#FF9000')};
    --shade_gray300: ${shade(0.2, '#3E3B47')};
    --shade_gray300_1: ${shade(0.1, '#3E3B47')};
    --shade_white_gray: ${shade(0.2, '#F4EdE8')};
    --shade_red200: ${shade(0.2, '#C53030')};
  }
`;
