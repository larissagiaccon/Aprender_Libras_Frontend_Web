import React from 'react';
import { FiClock } from 'react-icons/fi';
import { isToday } from 'date-fns';

import defaultImg from '../../../assets/default.svg';
import { useAuth } from '../../../hooks/auth';
import { IAppointment } from '../Appointment';

import { Container, Content, AvatarEmptyImg, UserAvatar } from './styles';

interface AppointmentProps {
  selectedDate: Date;
  nextAppointment: IAppointment | undefined;
}

const NextAppointment: React.FC<AppointmentProps> = ({
  selectedDate,
  nextAppointment,
}) => {
  const { user } = useAuth();

  return (
    <>
      {isToday(selectedDate) && nextAppointment && (
        <Container>
          <strong>Agendamento a seguir</strong>

          <Content>
            {nextAppointment?.user?.avatar_url ||
            nextAppointment?.provider?.avatar_url ? (
              <div>
                {nextAppointment?.user_id === user.id && (
                  <UserAvatar className="UserAvatar">
                    <img src={user.avatar_url} alt={user.name} />
                  </UserAvatar>
                )}
                <img
                  src={
                    nextAppointment?.user?.avatar_url ||
                    nextAppointment?.provider?.avatar_url
                  }
                  alt={
                    nextAppointment?.user?.name ||
                    nextAppointment?.provider?.name ||
                    'Visualização indisponível'
                  }
                />
              </div>
            ) : (
              <AvatarEmptyImg className="AvatarEmpty">
                {nextAppointment?.user_id === user.id && (
                  <UserAvatar className="UserAvatar">
                    <img src={user.avatar_url} alt={user.name} />
                  </UserAvatar>
                )}
                <img
                  src={defaultImg}
                  alt={
                    nextAppointment?.user?.name ||
                    nextAppointment?.provider?.name ||
                    'Visualização indisponível'
                  }
                />
              </AvatarEmptyImg>
            )}
            <strong>
              {nextAppointment?.user?.name || nextAppointment?.provider?.name}
            </strong>

            <span>
              <FiClock />
              {nextAppointment.hourFormatted}
            </span>
          </Content>
        </Container>
      )}
    </>
  );
};

export default NextAppointment;
