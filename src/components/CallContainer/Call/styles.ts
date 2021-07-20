import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'call' | 'answer' | 'error';
  hasDescription: number;
}

export const Container = styled(animated.div)<ContainerProps>`
  width: 22.5rem;

  position: relative;
  padding: 1rem 1.875rem 1rem 1rem;
  border-radius: 0.625rem;
  box-shadow: 0.125rem 0.125rem 0.5rem rgba(0, 0, 0, 0.2);

  display: flex;

  ${props =>
    props.type === 'error'
      ? css`
          background: var(--red_100);
          color: var(--red_200);
        `
      : css`
          background: var(--green_100);
          color: var(--green_300);
        `}

  & + div {
    margin-top: 0.5rem;
  }

  > svg {
    margin: 0.25rem 0.75rem 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 0.25rem;
      font-size: 0.875rem;
      opacity: 0.8;
      line-height: 1.25rem;
    }
  }

  button.buttonX {
    position: absolute;
    right: 1rem;
    top: 1.188rem;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;

export const Buttons = styled.div`
  display: flex;
  padding-top: 0.6rem;
  text-align: center;
  justify-content: center;

  button {
    border: 0;
    background: transparent;
    margin-right: 1rem;
    margin-left: 1rem;

    svg {
      margin-right: 0.5rem;
    }

    &.accept {
      color: var(--green_300);
    }

    &.end {
      color: var(--red_200);
    }
  }
`;
