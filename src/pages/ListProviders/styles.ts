import styled from 'styled-components';

export const Container = styled.div`
  .search {
    max-width: 70rem;
    margin: 4rem auto;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  padding-bottom: 2rem;
`;

export const ContainerContent = styled.div`
  max-width: 70rem;
  margin: 0 auto;

  display: grid;

  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;

  h1 {
    max-width: 70rem;
    margin: 4rem auto;
    font-size: 2.25rem;
  }
`;

export const ProviderContainer = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  transition: 0.3s opacity;
  background: var(--gray_300);
  padding-bottom: 0.625rem;

  a {
    color: var(--orange);
    display: block;
    margin: 0 0 0.625rem 0;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: var(--shade_orange);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0 auto;

      &:hover {
        color: var(--shade_orange);
      }
    }
  }
`;

export const ProviderAvatar = styled.div`
  margin-top: 1.25rem;
  height: 12.5rem;
  text-align: center;

  img {
    object-fit: cover;
    width: 12.5rem;
    height: 12.5rem;
    border-radius: 50%;
  }
`;

export const AvatarEmptyImg = styled.div`
  background: var(--gray_100);
  border-radius: 50%;
  width: 12.5rem;
  height: 12.5rem;
  margin-left: 1.75rem;

  img {
    width: 12.3rem;
    height: 12rem;
    margin: 0.5rem 0 0 0;
  }
`;

export const ProviderInfo = styled.div`
  padding: 1.25rem;
`;

export const ProviderName = styled.text`
  overflow: hidden;
`;

export const ProviderMeta = styled.div`
  display: flex;
  margin-top: 0.313rem;
  align-items: center;
  justify-content: right;

  svg {
    margin-right: 0.625rem;
  }
`;

export const ProviderMetaText = styled.text`
  color: var(--gray_100);
`;
