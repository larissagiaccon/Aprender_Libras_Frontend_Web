import React from 'react';
import { useTransition } from 'react-spring';

import Call from './Call';

import { CallMessage } from '../../hooks/call';
import { Container } from './styles';

interface CallContainerProps {
  messages: CallMessage[];
}

const CallContainer: React.FC<CallContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 1 },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Call key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default CallContainer;
