import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  max-width: 40rem;
  right: 0 auto;

  background: var(--gray_600);
  border-radius: 0.625rem;
  border: 0.125rem solid var(--gray_600);
  padding: 1rem;
  width: 100%;
  color: var(--gray_200);

  display: flex;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      color: var(--orange);
      border-color: var(--orange);
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
`;
