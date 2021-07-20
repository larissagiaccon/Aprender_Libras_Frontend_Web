import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  form {
    margin: 5rem 0;
    width: 21.25rem;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
      text-align: left;
      display: flex;
      flex-direction: row;
    }

    a {
      color: var(--white_gray);
      display: block;
      margin-top: 1.5rem;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: var(--shade_white_gray);
      }
    }
  }
`;

export const TrashIcon = styled.div`
  margin-left: auto;

  button {
    background: transparent;
    border: 0;

    &:hover {
      opacity: 0.8;
    }

    svg {
      color: var(--orange);
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 2rem;
  position: relative;
  align-self: center;

  img {
    object-fit: cover;
    width: 11.625rem;
    height: 11.625rem;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: var(--orange);
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
      color: var(--gray_400);
    }

    &:hover {
      background: var(--shade_orange);
    }
  }
`;

export const AvatarEmptyImg = styled.div`
  background: var(--gray_100);
  border-radius: 50%;
  width: 11.625rem;
  height: 11.625rem;
  margin-bottom: 0.313rem;

  svg {
    width: 6.25rem;
    height: 11rem;
    border-radius: 50%;
  }
`;
export const Overlay = styled.div`
  background: rgba(46, 46, 56, 0.8);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: default;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OverlayContainer = styled.div`
  background: var(--gray_600);
  width: 100%;
  max-width: 31.25rem;
  padding: 2rem 3rem 4rem 3rem;
  border-radius: 1.25rem;
  text-align: center;
  position: relative;
  opacity: 1;
`;

export const CheckModal = styled.div`
  color: var(--red_200);

  svg {
    width: 5rem;
    height: 5rem;
  }
`;

export const Title = styled.text`
  display: flex;
  color: var(--white_gray);
  font-size: 2rem;
  padding: 1.375rem;
  justify-content: center;
`;

export const Description = styled.text`
  display: flex;
  justify-content: center;
  color: var(--gray_100);
  font-size: 1.125rem;
  margin-top: 1rem;

  & + & {
    margin-top: 0.625rem;
    color: var(--red_200);
    text-decoration: underline;
  }
`;
export const ButtonCloseModal = styled.text`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  color: var(--orange);

  svg {
    width: 1.875rem;
    height: 1.875rem;
  }
`;

export const ButtonOkModal = styled.div`
  display: flex;
  color: var(--gray_400);
  background: var(--orange);
  flex-direction: row;
  border-radius: 0.625rem;
  transition: background-color 0.2s;
  align-items: center;
  padding: 1rem;
  margin-top: 2rem;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: var(--shade_orange);
  }
`;
