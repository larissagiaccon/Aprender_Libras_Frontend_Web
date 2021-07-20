import styled from 'styled-components';

export const Container = styled.section``;

export const Content = styled.section`
  margin-top: 3rem;

  > strong {
    color: var(--gray_100);
    font-size: 1.25rem;
    line-height: 1.625rem;
    border-bottom: 0.063rem solid var(--gray_300);
    display: block;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  > p {
    color: var(--gray_100);
  }
`;

export const AvatarEmptyImg = styled.div`
  flex: 1;
  background: var(--gray_100);
  display: flex;
  padding: 1rem 1.5rem;
  margin-left: 1.5rem;
  align-items: center;

  img {
    background: var(--gray_100);
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
  }

  strong {
    margin-left: 1.5rem;
    color: var(--white);
    font-size: 1.25rem;
  }
`;
