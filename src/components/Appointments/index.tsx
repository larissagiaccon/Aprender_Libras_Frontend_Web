import React, { useEffect, useMemo, useState } from 'react';
import { format, parseISO, isAfter } from 'date-fns';

import api from '../../services/api';

import NextAppointment from './NextAppointment';
import Appointment, { IAppointment } from './Appointment';

import { Container, Content } from './styles';
import { useAuth } from '../../hooks/auth';

interface AppointmentsProps {
  selectedDate: Date;
  appointmentForUser: boolean;
  appointmentByUser: boolean;
}

const Appointments: React.FC<AppointmentsProps> = ({
  selectedDate,
  appointmentForUser,
  appointmentByUser,
}) => {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [deletedAppointment, setDeletedAppointment] = useState(false);

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

          if (appointmentByUser && appointmentForUser) {
            setAppointments(
              appointmentsFormatted.sort((a, b) =>
                a.hourFormatted.localeCompare(b.hourFormatted),
              ),
            );
          } else if (appointmentForUser) {
            setAppointments(
              appointmentsFormatted
                .filter(appointment => appointment?.provider_id === user.id)
                .sort((a, b) => a.hourFormatted.localeCompare(b.hourFormatted)),
            );
          } else if (appointmentByUser) {
            setAppointments(
              appointmentsFormatted
                .filter(appointment => appointment?.provider_id !== user.id)
                .sort((a, b) => a.hourFormatted.localeCompare(b.hourFormatted)),
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedDate, user.id, appointmentForUser, appointmentByUser]);

  useEffect(() => {
    // const refreshingAppointment = setInterval(() => {
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

    // }, 1000);

    // return () => {
    //   clearInterval(refreshingAppointment);
    // };
  }, [selectedDate, deletedAppointment]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const affternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  return (
    <Container>
      <NextAppointment
        selectedDate={selectedDate}
        nextAppointment={nextAppointment}
      />

      <Content>
        <strong>Manhã</strong>

        {morningAppointments.length === 0 && (
          <p>Nenhum agendamento neste período</p>
        )}

        {morningAppointments.map(appointment => (
          <Appointment
            key={appointment.id}
            appointment={appointment}
            nextAppointment={nextAppointment}
            setDeletedAppointment={setDeletedAppointment}
          />
        ))}
      </Content>

      <Content>
        <strong>Tarde</strong>

        {affternoonAppointments.length === 0 && (
          <p>Nenhum agendamento neste período</p>
        )}

        {affternoonAppointments.map(appointment => (
          <Appointment
            key={appointment.id}
            appointment={appointment}
            nextAppointment={nextAppointment}
            setDeletedAppointment={setDeletedAppointment}
          />
        ))}
      </Content>
    </Container>
  );
};

export default Appointments;
