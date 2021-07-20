import styled, { css, keyframes } from 'styled-components';

interface ButtonProps {
  visible: boolean;
}

export const Container = styled.div``;

export const Content = styled.div`
  max-width: 67.5rem;
  display: flex;
  margin: 4rem auto;
`;

export const ListProviders = styled.div``;

export const VideoContainer = styled.div`
  max-width: 70rem;
  height: 34.68rem;
  max-height: 34.68rem;
  margin: 1rem auto;
  margin-bottom: 0.625rem;
`;

export const VideoUser = styled.div`
  display: relative;

  video {
    width: 23.33rem;
    max-width: 23.33rem;
    height: 100%;
    border-radius: 1rem;
  }

  div {
    width: 23.33rem;
    height: 100%;
    border-radius: 1rem;
    background: var(--black);
  }
`;

export const VideoOtherUser = styled.div`
  cursor: pointer;
  position: absolute;

  video {
    width: 46.66rem;
    height: 34.68rem;
    border-radius: 1rem;
  }

  div {
    width: 46.66rem;
    height: 34.68rem;
    border-radius: 1rem;
    background: var(--black);
  }
`;

const apperFromLow = keyframes`
  from {
    opacity: 0;
    transform: translateY(1.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const apperFromUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(1.5rem);
  }
`;

export const ButtonX = styled.div<ButtonProps>`
  position: absolute;
  top: 40.5rem;
  margin-left: 23rem;

  button {
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
    min-height: 3rem;
    border-radius: 50%;
    background: var(--red_200);
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    animation: ${({ visible }) =>
      visible
        ? css`
            ${apperFromLow} 1s
          `
        : css`
            ${apperFromUp} 1s
          `};

    svg {
      width: 1.56rem;
      height: 1.56rem;
      min-width: 1.56rem;
      min-height: 1.56rem;
      color: var(--gray_400);
    }

    &:hover {
      background: var(--shade_red200);
    }
  }
`;

export const ChatStreamAndVideoUser = styled.div`
  position: relative;
  left: 46.91rem;
`;
