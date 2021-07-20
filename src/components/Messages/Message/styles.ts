import styled, { css } from 'styled-components';

interface ExistsCall {
  existsCall: boolean;
}

export const Container = styled.div<ExistsCall>`
  display: flex;
  flex-direction: column;
  margin-top: 1.438rem;
  padding: 0.625rem;
  padding-top: 0;
  background: var(--gray_300);
  border-radius: 0.625rem;
  overflow-wrap: break-word;
  width: max-content;

  ${props =>
    props.existsCall
      ? css`
          max-width: 28.125rem;
        `
      : css`
          max-width: 9.5rem;
        `}

  ::before {
    content: '';
    border-style: solid;
    border-color: var(--gray_300) transparent;
    position: relative;
  }

  &.user {
    margin-right: 1.25rem;
    margin-left: auto;
    border-top-right-radius: 0;
    align-self: flex-end;

    ::before {
      border-width: 0.625rem 0.625rem 0 0;
      transform: translateX(200%);
      align-self: flex-end;
    }

    & + & {
      margin-top: 0.313rem;
      padding-top: 0.625rem;
      border-radius: 0.625rem;

      ::before {
        content: none;
      }
    }
  }

  &.other {
    margin-right: 15.625rem;
    margin-left: 1.25rem;
    border-top-left-radius: 0;
    align-self: flex-start;

    ::before {
      border-width: 0.625rem 0 0 0.625rem;
      transform: translateX(-200%);
      align-self: flex-start;
    }

    & + & {
      margin-top: 0.313rem;
      padding-top: 0.625rem;
      border-radius: 0.625rem;

      ::before {
        content: none;
      }
    }
  }
`;

export const HourMessage = styled.text`
  font-size: 0.75rem;
  transform: translateY(50%);
  opacity: 0.4;
  align-self: flex-end;

  padding-left: 2.5rem;
`;

export const MessageText = styled.text`
  overflow-wrap: break-word;
  word-break: break-word;
`;
