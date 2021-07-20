import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 70rem;
  margin: 4rem auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 7.5rem;

  h1 {
    font-size: 2.25rem;
  }

  p {
    margin-top: 0.5rem;
    color: var(--orange);
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 0.063rem;
      height: 0.75rem;
      background: var(--orange);
      margin: 0 0.5rem;
    }

    svg {
      margin-left: auto;
      cursor: pointer;
    }
  }
`;

export const CheckOptions = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;

  button {
    background: none;
    border: 0;
    font-weight: 500;
    color: var(--white_gray);
    display: flex;
    align-items: center;

    &.byUser {
      margin-left: 1rem;
    }

    svg {
      margin-right: 0.5rem;
      color: var(--orange);
    }
  }
`;
