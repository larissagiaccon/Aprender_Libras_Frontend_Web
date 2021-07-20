import styled from 'styled-components';

export const Container = styled.aside`
  width: 23.75rem;

  .DayPicker {
    border-radius: 0.625rem;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: var(--gray_300);
    border-radius: 0.625rem;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: var(--gray_100) !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 0.5rem;
    margin: 1rem 0 0 0;
    padding: 1rem;
    background-color: var(--gray_500);
    border-radius: 0 0 0.625rem 0.625rem;
  }

  .DayPicker-Caption {
    margin-bottom: 1rem;
    padding: 0 1rem;
    color: var(--white_gray);

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 2.5rem;
    height: 2.5rem;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: var(--gray_300);
    border-radius: 0.625rem;
    color: var(--white);
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: var(--shade_gray300);
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: var(--gray_200) !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: var(--orange) !important;
    border-radius: 0.625rem;
    color: var(--gray_600) !important;
  }
`;
