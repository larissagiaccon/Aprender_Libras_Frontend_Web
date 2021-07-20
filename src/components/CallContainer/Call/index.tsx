import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
  FiVideo,
  FiXCircle,
  FiPhoneIncoming,
  FiPhoneMissed,
} from 'react-icons/fi';

import { CallMessage, useCall } from '../../../hooks/call';
import { Container, Buttons } from './styles';

interface CallProps {
  message: CallMessage;
  style: object;
}

const Call: React.FC<CallProps> = ({ message, style }) => {
  const history = useHistory();
  const { removeCall, endCall } = useCall();

  useEffect(() => {
    const timer = setTimeout(() => {
      endCall();
      removeCall(message.id);
    }, 30000);

    return () => {
      clearTimeout(timer);
    };
  }, [endCall, removeCall, message.id]);

  const handleAcceptCall = useCallback(async () => {
    history.push('/converse?accept=true');

    removeCall(message.id);
  }, [history, removeCall, message.id]);

  const handleEndCall = useCallback(async () => {
    endCall();
    removeCall(message.id);
  }, [removeCall, message.id, endCall]);

  return (
    <Container
      type={message.type}
      hasDescription={Number(!!message.description)}
      style={style}
    >
      <FiVideo />
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}

        <Buttons>
          {message.type === 'answer' && (
            <button type="button" className="accept" onClick={handleAcceptCall}>
              <FiPhoneIncoming size="0.938rem" />
              Aceitar
            </button>
          )}

          <button type="button" className="end" onClick={handleEndCall}>
            <FiPhoneMissed size="0.938rem" />
            {message.type === 'answer' ? 'Recusar' : 'Encerrar'}
          </button>
        </Buttons>
      </div>

      <button type="button" className="buttonX" onClick={handleEndCall}>
        <FiXCircle size="1.125rem" />
      </button>
    </Container>
  );
};

export default Call;
