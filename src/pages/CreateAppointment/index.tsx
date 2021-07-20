import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DayModifiers } from 'react-day-picker';
import { isToday, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-day-picker/lib/style.css';
import { useLocation, useHistory } from 'react-router-dom';
import { FiCheck, FiX } from 'react-icons/fi';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Calendar from '../../components/Calendar';
import Providers from '../../components/Providers';

import {
  Container,
  Content,
  Schedule,
  Section,
  SectionHour,
  Hour,
  HourText,
  Overlay,
  OverlayContainer,
  CheckModal,
  Title,
  Description,
  ButtonCloseModal,
  CalendarAndButton,
  ButtonCreateAppointment,
} from './styles';

interface HourAvailabilityItem {
  hour: number;
  available: boolean;
}

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const location = useLocation();
  const history = useHistory();

  const minimumDate = useMemo(() => {
    const today = new Date();

    if (today.getDay() === 6) {
      return new Date(today.setDate(today.getDate() + 2));
    }

    if (today.getDay() === 6 || today.getDay() === 0) {
      return new Date(today.setDate(today.getDate() + 1));
    }

    if (today.getHours() >= 17) {
      return new Date(today.setDate(today.getDate() + 1));
    }

    return today;
  }, []);

  const [availability, setAvailability] = useState<HourAvailabilityItem[]>([]);
  const [selectedHour, setSelectedHour] = useState(0);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [nameProvider, setNameProvider] = useState<Provider>();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedDate, setSelectedDate] = useState(minimumDate);
  const [selectedProvider, setSelectedProvider] = useState<string>(
    String(location.state),
  );
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [isCreatedAppointment, setIsCreatedAppointment] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get<Provider[]>('providers');

        setProviders(
          response.data.sort((a, b) => a.name.localeCompare(b.name)),
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(
          `/providers/${selectedProvider}/day-availability`,
          {
            params: {
              day: selectedDate.getDate(),
              month: selectedDate.getMonth() + 1,
              year: selectedDate.getFullYear(),
            },
          },
        );

        setAvailability(response.data);
        setSelectedHour(0);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedProvider, selectedDate]);

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

        setMonthAvailability(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentMonth, user.id]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
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

  const morningAvailability = useMemo(() => {
    return availability
      ?.filter(({ hour }) => hour <= 12)
      .map(({ hour, available }) => ({
        hour,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        available,
      }));
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      ?.filter(({ hour }) => hour > 12)
      .map(({ hour, available }) => ({
        hour,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        available,
      }));
  }, [availability]);

  const formattedDate = useMemo(() => {
    let dayWeek = format(selectedDate, 'EEEE', {
      locale: ptBR,
    });

    const dayStart = dayWeek.charAt(0);
    const dayEnd = dayWeek.substring(1, dayWeek.length);

    dayWeek = dayStart.replace(dayStart, dayStart.toUpperCase()).concat(dayEnd);

    const day = format(selectedDate, 'dd', {
      locale: ptBR,
    });

    let month = format(selectedDate, 'MMMM', {
      locale: ptBR,
    });

    const monthStart = month.charAt(0);
    const monthEnd = month.substring(1, month.length);

    month = monthStart
      .replace(monthStart, monthStart.toUpperCase())
      .concat(monthEnd);

    const year = format(selectedDate, 'yyyy', {
      locale: ptBR,
    });

    return `${dayWeek}, dia ${day} de ${month} de ${year} às ${selectedHour}:00h`;
  }, [selectedDate, selectedHour]);

  const handleCloseModalCreatedAppointment = useCallback(async () => {
    setIsCreatedAppointment(false);

    history.push('/dashboard');
  }, [history]);

  const handleCreateAppointment = useCallback(async () => {
    setNameProvider(
      providers?.find(provider => provider.id === selectedProvider),
    );

    const date = new Date(selectedDate);

    try {
      date.setHours(selectedHour);
      date.setMinutes(0);
      date.setSeconds(0);

      const response = await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });

      if (response.data) {
        setIsCreatedAppointment(true);
      }
    } catch (error) {
      if (!selectedHour) {
        addToast({
          type: 'error',
          title: 'Erro ao realizar o agendamento',
          description:
            'Ocorreu um erro ao tentar realizar um agendamento sem selecionar um horário, escolha um horário e tente novamente.',
        });
      } else if (new Date() > date) {
        addToast({
          type: 'error',
          title: 'Erro ao realizar o agendamento',
          description:
            'Ocorreu um erro ao tentar realizar um agendamento em um horário já passado, tente novamente outro horário/data.',
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao realizar o agendamento',
          description:
            'Ocorreu um erro ao tentar realizar um agendamento, tente novamente.',
        });
      }
    }
  }, [providers, selectedProvider, selectedDate, selectedHour, addToast]);

  return (
    <Container>
      <Header />

      <Content>
        <Providers
          selectedProvider={selectedProvider}
          handleSelectProvider={handleSelectProvider}
        />

        <Schedule>
          <h1>Escolha a data</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>
          <Section>
            <strong>Manhã</strong>

            {morningAvailability.length === 0 && (
              <p>Nenhuma data disponível neste período</p>
            )}

            <SectionHour>
              {morningAvailability.map(({ hourFormatted, hour, available }) => (
                <Hour
                  disabled={!available}
                  available={available}
                  selected={hour === selectedHour}
                  onClick={() => setSelectedHour(hour)}
                  key={hourFormatted}
                >
                  <HourText selected={hour === selectedHour}>
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionHour>
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAvailability.length === 0 && (
              <p>Nenhuma data disponível neste período</p>
            )}

            <SectionHour>
              {afternoonAvailability.map(
                ({ hourFormatted, hour, available }) => (
                  <Hour
                    available={available}
                    selected={hour === selectedHour}
                    onClick={() => setSelectedHour(hour)}
                    key={hourFormatted}
                  >
                    <HourText selected={hour === selectedHour}>
                      {hourFormatted}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionHour>
          </Section>
        </Schedule>

        <CalendarAndButton>
          <Calendar
            handleDateChange={handleDateChange}
            handleMonthChange={handleMonthChange}
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            monthAvailability={monthAvailability}
          />

          <ButtonCreateAppointment>
            <Button onClick={handleCreateAppointment}>Agendar</Button>
          </ButtonCreateAppointment>
        </CalendarAndButton>
      </Content>

      {isCreatedAppointment && (
        <Overlay>
          <OverlayContainer>
            <CheckModal>
              <FiCheck />
            </CheckModal>

            <Title>Agendamento concluído</Title>
            <Description>{formattedDate}</Description>
            <Description>com {nameProvider?.name}</Description>

            <ButtonCloseModal onClick={handleCloseModalCreatedAppointment}>
              <FiX />
            </ButtonCloseModal>
          </OverlayContainer>
        </Overlay>
      )}
    </Container>
  );
};

export default CreateAppointment;
