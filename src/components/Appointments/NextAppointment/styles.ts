import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;

  strong {
    color: var(--gray_100);
    font-size: 1.25rem;
    font-weight: 400;
  }
`;

export const Content = styled.div`
  background: var(--gray_300);
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 0.625rem;
  margin-top: 1.5rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 80%;
    width: 0.063rem;
    left: 0;
    top: 10%;
    background: var(--orange);
  }

  img {
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
  }

  strong {
    margin-left: 1.5rem;
    color: var(--white);
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: var(--gray_100);

    svg {
      color: var(--orange);
      margin-right: 0.5rem;
    }
  }
`;

export const AvatarEmptyImg = styled.div`
  display: flex;
  background: var(--gray_100);
  margin-left: 1.5rem;
  align-items: center;
  border-radius: 50%;
  position: relative;

  img {
    width: 5rem;
    height: 5rem;
  }

  strong {
    margin-left: 1.5rem;
    color: var(--white);
    font-size: 1.25rem;
  }
`;

export const UserAvatar = styled.div`
  width: 2.5rem;
  height: 3.5rem;
  margin-left: 3.2rem;
  position: absolute;
  margin-bottom: 1.5rem;

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 0.063rem solid var(--gray_400);
  }
`;
