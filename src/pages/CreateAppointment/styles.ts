import styled from 'styled-components';

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 70rem;
  margin: 4rem auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin: 0 1.875rem;

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
  }
`;

export const Section = styled.section`
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

export const SectionHour = styled.section`
  display: flex;
  flex-direction: row;
`;

export const Hour = styled.button<HourProps>`
  padding: 0.75rem;
  background: ${props =>
    props.selected ? 'var(--orange)' : 'var(--gray_300)'};
  border-radius: 0.625rem;
  margin-right: 0.5rem;
  opacity: ${props => (props.available ? 1 : 0.3)};
  cursor: pointer;
  transition: background-color 0.2s;
  border: 0;

  &:disabled {
    pointer-events: none;
  }

  &:hover {
    background: ${props =>
      props.selected ? 'var(--shade_orange_1)' : 'var(--shade_gray300_1)'};
  }
`;

export const HourText = styled.text<HourTextProps>`
  font-size: 1.125rem;
  color: ${props => (props.selected ? 'var(--gray_600)' : 'var(--white_gray)')};
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
  color: var(--green_200);

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

export const ButtonCreateAppointment = styled.div`
  max-width: 70rem;
  margin: 4rem auto;
  display: flex;
`;

export const CalendarAndButton = styled.div``;
