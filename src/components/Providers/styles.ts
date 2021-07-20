import styled, { css } from 'styled-components';

interface ProviderContentProps {
  selected: boolean;
  status: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

export const Container = styled.div`
  padding: 0 1.25rem 0 0;
  width: 18.75rem;

  .search {
    margin-bottom: 1rem;
  }
`;

export const ContentContainer = styled.div`
  padding: 0 1.25rem 0 0;
  width: 18.75rem;
  height: 26rem;
  overflow-y: scroll;
  margin-right: 0;

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

export const Content = styled.div<ProviderContentProps>`
  border-radius: 0.5rem;
  margin-bottom: 1.25rem;
  overflow: hidden;
  transition: 0.3s opacity;
  background: ${props =>
    props.selected ? 'var(--orange)' : 'var(--gray_300)'};
  cursor: pointer;
  transition: background-color 0.2s;

  display: flex;
  align-items: center;

  box-shadow: 0.125rem 0.125rem 0.5rem rgba(0, 0, 0, 0.2);

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${props =>
      props.selected ? 'var(--shade_orange)' : 'var(--shade_gray300_1)'};
  }

  & .status {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-left: 1rem;

    ${props =>
      props.status
        ? css`
            background: var(--green_400);
          `
        : css`
            background: var(--gray_100);
          `};
  }
`;

export const ProviderAvatar = styled.div`
  margin: 1.25rem 0 1.25rem 1rem;
  height: 3.5rem;
  text-align: center;

  img {
    object-fit: cover;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
  }
`;

export const AvatarEmptyImg = styled.div`
  background: var(--gray_100);
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;

  img {
    margin: 0;
    padding: 0.5rem;
  }
`;

export const ProviderName = styled.text`
  margin-bottom: 0.4rem;
  overflow: hidden;
`;

export const ProviderNameAndLastMessages = styled.div<ProviderNameProps>`
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
  overflow: hidden;
  color: ${props => (props.selected ? 'var(--gray_600)' : 'var(--white_gray)')};
`;

export const LastMessages = styled.text`
  overflow: hidden;
  font-size: 0.7rem;
`;

export const Notification = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: var(--orange);
  margin-left: auto;
  margin-right: 1rem;

  p {
    margin-right: 0.2rem;
  }

  svg {
  }
`;
