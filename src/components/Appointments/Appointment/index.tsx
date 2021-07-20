import React, { useCallback } from 'react';
import { FiClock, FiX } from 'react-icons/fi';
import { isBefore, parseISO } from 'date-fns';
import { isEqual } from 'date-fns/esm';

import api from '../../../services/api';
import defaultImg from '../../../assets/default.svg';
import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';

import { Container, AvatarEmptyImg, UserAvatar } from './styles';

export interface IUser {
  id: string;
  name: string;
  avatar_url: string;
}

export interface IAppointment {
  id: string;
  date: string;
  hourFormatted: string;
  user?: IUser;
  provider?: IUser;
  user_id: string;
  provider_id: string;
}

interface AppointmentProps {
  appointment: IAppointment;
  nextAppointment: IAppointment | undefined;
  setDeletedAppointment: (state: any) => void;
}

const Appointment: React.FC<AppointmentProps> = ({
  appointment,
  nextAppointment,
  setDeletedAppointment,
}) => {
  const { addToast } = useToast();
  const { user } = useAuth();

  const handleDeleteAppointment = useCallback(async () => {
    try {
      const response = await api.delete(`appointments`, {
        params: {
          appointment_id: appointment.id,
        },
      });

      if (response.status === 200) {
        addToast({
          type: 'success',
          title: 'Agendamento excluído!',
          description: 'O agendamento foi excluído com sucesso.',
        });

        setDeletedAppointment(state => !state);
      }
    } catch (error) {
      if (isBefore(parseISO(appointment.date), new Date())) {
        addToast({
          type: 'error',
          title: 'Erro ao excluir o agendamento',
          description:
            'Ocorreu um erro ao tentar excluir um agendamento com um horário já passado.',
        });
      } else if (
        nextAppointment &&
        isEqual(parseISO(appointment.date), parseISO(nextAppointment.date))
      ) {
        addToast({
          type: 'error',
          title: 'Erro ao excluir o agendamento',
          description:
            'Ocorreu um erro ao tentar excluir um agendamento em cima da hora.',
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao excluir o agendamento',
          description:
            'Ocorreu um erro ao tentar excluir o agendamento, tente novamente.',
        });
      }
    }
  }, [setDeletedAppointment, appointment, nextAppointment, addToast]);

  return (
    <Container>
      <span>
        <FiClock />
        {appointment.hourFormatted}
      </span>

      {appointment?.user?.avatar_url || appointment?.provider?.avatar_url ? (
        <div>
          {appointment?.user_id === user.id && (
            <UserAvatar className="UserAvatar">
              <img src={user.avatar_url} alt={user.name} />
            </UserAvatar>
          )}
          <img
            src={
              appointment?.user?.avatar_url || appointment?.provider?.avatar_url
            }
            alt={
              appointment?.user?.name ||
              appointment?.provider?.name ||
              'Visualização indisponível'
            }
          />
          <strong>
            {appointment?.user?.name ||
              appointment?.provider?.name ||
              'Visualização indisponível'}
          </strong>
          <FiX onClick={handleDeleteAppointment} />
        </div>
      ) : (
        <AvatarEmptyImg>
          {appointment?.user_id === user.id && (
            <UserAvatar className="UserAvatar">
              <img src={user.avatar_url} alt={user.name} />
            </UserAvatar>
          )}
          <img
            src={defaultImg}
            alt={
              appointment?.user?.name ||
              appointment?.provider?.name ||
              'Visualização indisponível'
            }
          />
          <strong>
            {appointment?.user?.name ||
              appointment?.provider?.name ||
              'Visualização indisponível'}
          </strong>
          <FiX onClick={handleDeleteAppointment} />
        </AvatarEmptyImg>
      )}
    </Container>
  );
};

export default Appointment;
