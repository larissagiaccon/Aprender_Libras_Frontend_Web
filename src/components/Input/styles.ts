import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--gray_600);
  border-radius: 0.625rem;
  border: 0.125rem solid var(--gray_600);
  padding: 1rem;
  width: 100%;
  color: var(--gray_200);

  display: flex;
  align-items: center;

  & + div {
    margin-top: 0.5rem;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--red_200);
    `}

  ${props =>
    props.isFocused &&
    css`
      color: var(--orange);
      border-color: var(--orange);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--orange);
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--white_gray);

    &::placeholder {
      color: var(--gray_200);
    }
  }

  svg {
    margin-right: 1rem;
  }
`;

export const Error = styled(Tooltip)`
  height: 1.25rem;
  margin-left: 1rem;

  svg {
    margin: 0;
  }

  span {
    background: var(--red_200);
    color: var(--white);

    &::before {
      border-color: var(--red_200) transparent;
    }
  }
`;
