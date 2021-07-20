import React, { useState } from 'react';

import { useAuth } from '../../../hooks/auth';

import { Container, HourMessage, MessageText } from './styles';

interface AllMessageFormData {
  id: string;
  user_id: string;
  provider_id: string;
  text: string;
  created_at: string;
  updated_at: string;
  hourFormatted: string;
}

interface MessageProps {
  message: AllMessageFormData;
  existsCall: boolean;
}

const Message: React.FC<MessageProps> = ({ message, existsCall }) => {
  const { user } = useAuth();
  const [user_id] = useState<string>(user.id);

  return (
    <>
      {message.user_id === user_id ? (
        <Container key={message.id} className="user" existsCall={!existsCall}>
          <MessageText className="user">{message.text}</MessageText>
          <HourMessage className="user">{message.hourFormatted}</HourMessage>
        </Container>
      ) : (
        <Container key={message.id} className="other" existsCall={!existsCall}>
          <MessageText className="other">{message.text}</MessageText>
          <HourMessage className="other">{message.hourFormatted}</HourMessage>
        </Container>
      )}
    </>
  );
};

export default Message;
