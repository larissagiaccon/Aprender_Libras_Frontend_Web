import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DayModifiers } from 'react-day-picker';
import { isToday, format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-day-picker/lib/style.css';
import { FiSquare, FiXSquare } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Header from '../../components/Header';
import Calendar from '../../components/Calendar';
import Appointments from '../../components/Appointments';
import { IAppointment } from '../../components/Appointments/Appointment';

import { Container, Content, Schedule, CheckOptions } from './styles';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const minimumDate = useMemo(() => {
    const today = new Date();

    if (today.getDay() === 6) {
      return new Date(today.setDate(today.getDate() + 2));
    }

    if (today.getDay() === 6 || today.getDay() === 0) {
      return new Date(today.setDate(today.getDate() + 1));
    }

    if (today.getHours() >= 17 && today.getDay() === 5) {
      return new Date(today.setDate(today.getDate() + 3));
    }

    if (today.getHours() >= 17) {
      return new Date(today.setDate(today.getDate() + 1));
    }

    return today;
  }, []);

  const [appointmentForUser, setAppointmentForUser] = useState<boolean>(true);
  const [appointmentByUser, setAppointmentByUser] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState(minimumDate);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [, setAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(
          `/providers/${user.id}/month-availability`,
          {
            params: {
              month: currentMonth.getMonth() + 1,
              year: currentMonth.getFullYear(),
            },
          },
        );

        if (response) {
          setMonthAvailability(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentMonth, user.id]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get<IAppointment[]>('/appointments/me', {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        });

        if (response) {
          const appointmentsFormatted = response.data.map(appointment => {
            return {
              ...appointment,
              hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
            };
          });

          setAppointments(
            appointmentsFormatted.sort((a, b) =>
              a.hourFormatted.localeCompare(b.hourFormatted),
            ),
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedDate]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectedDate]);

  const handleSelectForUser = useCallback(async () => {
    setAppointmentForUser(state => !state);
  }, []);

  const handleSelectByUser = useCallback(async () => {
    setAppointmentByUser(state => !state);
  }, []);

  return (
    <Container>
      <Header />

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>

          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <CheckOptions>
            <button
              type="button"
              onClick={handleSelectForUser}
              className="forUser"
            >
              {appointmentForUser ? <FiXSquare /> : <FiSquare />}
              Horários agendados para mim
            </button>

            <button
              type="button"
              onClick={handleSelectByUser}
              className="byUser"
            >
              {appointmentByUser ? <FiXSquare /> : <FiSquare />}
              Horários agendados por mim
            </button>
          </CheckOptions>

          <Appointments
            selectedDate={selectedDate}
            appointmentForUser={appointmentForUser}
            appointmentByUser={appointmentByUser}
          />
        </Schedule>

        <Calendar
          handleDateChange={handleDateChange}
          handleMonthChange={handleMonthChange}
          selectedDate={selectedDate}
          currentMonth={currentMonth}
          monthAvailability={monthAvailability}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
