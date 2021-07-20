import styled from 'styled-components';

export const Container = styled.header`
  padding: 2rem 0;
  background: var(--gray_500);
`;

export const ContainerContent = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 5rem;
  }

  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      font-size: 2rem;
      font-family: 'Schoolbell', sans-serif;
      color: var(--orange);

      &:first-child {
        border-bottom: 0.075rem solid var(--gray_300);
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5rem;

  img {
    object-fit: cover;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    margin-left: 1rem;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    line-height: 1.5rem;

    span {
      color: var(--white_gray);
    }

    a {
      text-decoration: none;
      color: var(--orange);

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Buttons = styled.div`
  margin-left: auto;
  display: flex;

  a {
    margin-right: 1.25rem;
  }

  button {
    background: transparent;
    border: 0;

    &:hover {
      opacity: 0.8;
    }

    svg {
      color: var(--gray_100);
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

export const AvatarEmptyImg = styled.div`
  background: var(--gray_100);
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;

  img {
    margin: 0;
  }
`;

export const NumberMessages = styled.div`
  position: absolute;
  width: 0.9rem;
  padding: 0.1rem;
  margin-top: -1.9rem;
  margin-left: 0.7rem;
  font-size: 0.5rem;
  border-radius: 50%;
  background: var(--orange);
  color: var(--gray_600);
`;
