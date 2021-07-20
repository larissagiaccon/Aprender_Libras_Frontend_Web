import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 1rem;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: var(--white_gray);
    width: 4.375rem;

    svg {
      color: var(--orange);
      margin-right: 0.5rem;
    }
  }

  > div {
    flex: 1;
    background: var(--gray_300);
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    border-radius: 0.625rem;
    margin-left: 1.5rem;
    position: relative;

    > img {
      height: 3.5rem;
      width: 3.5rem;
      border-radius: 50%;
    }

    strong {
      margin-left: 1.5rem;
      color: var(--white);
      font-size: 1.25rem;
    }

    svg {
      color: var(--orange);
      margin-left: auto;
      cursor: pointer;
    }
  }
`;

export const AvatarEmptyImg = styled.div`
  flex: 1;
  background: var(--gray_100);
  display: flex;
  padding: 1rem 1.5rem;
  margin-left: 1.5rem;
  align-items: center;
  position: relative;

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

  svg {
    color: var(--orange);
    margin-left: auto;
    cursor: pointer;
  }
`;

export const UserAvatar = styled.div`
  width: 2.5rem;
  height: 3.5rem;
  margin-left: 2.5rem;
  position: absolute;

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 0.063rem solid var(--gray_400);
  }
`;
