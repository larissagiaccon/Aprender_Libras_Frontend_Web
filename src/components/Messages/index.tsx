import React from 'react';

import Message from './Message';

import { Container } from './styles';

interface AllMessageFormData {
  id: string;
  user_id: string;
  provider_id: string;
  text: string;
  created_at: string;
  updated_at: string;
  hourFormatted: string;
}

interface MessagesProps {
  history: AllMessageFormData[];
  existsCall: boolean;
}

const Messages: React.FC<MessagesProps> = ({ history, existsCall }) => {
  return (
    <Container>
      {history?.map(message => (
        <Message key={message.id} message={message} existsCall={existsCall} />
      ))}
    </Container>
  );
};

export default Messages;
