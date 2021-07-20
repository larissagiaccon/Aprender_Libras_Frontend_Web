import styled, { css } from 'styled-components';

interface ExistsCall {
  existsCall: boolean;
}

export const Container = styled.div<ExistsCall>`
  background: var(--gray_600);
  border-radius: 0.625rem;
  margin: 0 auto;
  padding: 0.938rem;

  ${props =>
    props.existsCall
      ? css`
          margin-left: 1.25rem;
          width: 47.5rem;
          max-width: 47.5rem;
          flex: 1;
          height: 30.5rem;
          max-height: 30.5rem;
        `
      : css`
          width: 23.33rem;
          max-width: 23.33rem;
          position: absolute;
          height: 17rem;
          max-height: 17rem;
        `}
`;

export const Content = styled.div<ExistsCall>``;

export const ChatHeader = styled.div`
  display: flex;
  border-bottom: 0.063rem solid var(--gray_300);
  margin-bottom: 1rem;
  justify-content: space-between;
  align-items: baseline;

  strong {
    color: var(--white_gray);
    font-size: 1.25rem;
    line-height: 1.625rem;
    padding-bottom: 1rem;
  }

  button {
    border: 0;
    background: none;

    &:disabled {
      cursor: default;
    }

    &:hover:not(:disabled) {
      opacity: 0.8;
    }

    svg {
      background: transparent;
      margin-right: 0.625rem;
      border: 0;
      color: var(--orange);
      width: 1.25rem;
      height: 1.25rem;
      /* cursor: pointer; */
    }
  }
`;

export const ChatBox = styled.div<ExistsCall>`
  border-bottom: 0.063rem solid var(--gray_300);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  ${props =>
    props.existsCall
      ? css`
          height: 21.875rem;
          max-width: 47.5rem;
        `
      : css`
          height: 12rem;
          max-height: 12rem;
          max-width: 23.33rem;
          overflow-x: hidden;
          background: var(--gray_600);
          border-radius: 0.625rem;
        `}

  ::-webkit-scrollbar-track {
    background-color: var(--gray_600);
    border-radius: 3.125rem;
    border: 3.125rem;
  }

  ::-webkit-scrollbar {
    width: 0.375rem;
    background: var(--gray_600);
    border-radius: 3.125rem;
    border: 3.125rem;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--orange);
    border-radius: 3.125rem;
    border: 3.125rem;
  }
`;

export const InputMessageContainer = styled.div`
  display: flex;
  height: 3.125rem;
`;

export const InputMessage = styled.div`
  display: flex;
  flex: 1;
  margin: 0.313rem 0 0 0;
  padding: 0.313rem;
  border-radius: 0.313rem;
  margin-top: 0.625rem;

  align-items: center;

  button {
    background: transparent;
    border: none;

    svg {
      color: var(--orange);
      margin-left: 0.938rem;
      transform: rotate(90deg);
    }
  }
`;
