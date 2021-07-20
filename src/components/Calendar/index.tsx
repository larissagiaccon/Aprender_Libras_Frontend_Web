import React, { useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';

import { Container } from './styles';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface CalendarProps {
  handleDateChange: (day: Date, modifiers: DayModifiers) => void;
  handleMonthChange: (month: Date) => void;
  selectedDate: Date;
  currentMonth: Date;
  monthAvailability: MonthAvailabilityItem[];
}

const Calendar: React.FC<CalendarProps> = ({
  handleDateChange,
  handleMonthChange,
  selectedDate,
  currentMonth,
  monthAvailability,
}) => {
  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const { day } = monthDay;
        const month = currentMonth.getMonth();
        const year = currentMonth.getFullYear();

        return new Date(year, month, day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  return (
    <Container>
      <DayPicker
        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
        fromMonth={new Date()}
        disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
        modifiers={{
          available: { daysOfWeek: [1, 2, 3, 4, 5] },
        }}
        onDayClick={handleDateChange}
        onMonthChange={handleMonthChange}
        selectedDays={selectedDate}
        months={[
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ]}
      />
    </Container>
  );
};

export default Calendar;
