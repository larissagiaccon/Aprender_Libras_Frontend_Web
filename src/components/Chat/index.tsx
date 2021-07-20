import React, { useEffect, useRef } from 'react';

import { FiVideo, FiTriangle } from 'react-icons/fi';

import Input from '../Input';
import Messages from '../Messages';

import {
  Container,
  Content,
  ChatHeader,
  ChatBox,
  InputMessageContainer,
  InputMessage,
} from './styles';

interface AllMessageFormData {
  id: string;
  user_id: string;
  provider_id: string;
  text: string;
  created_at: string;
  updated_at: string;
  hourFormatted: string;
}

interface ChatProps {
  existsCall: boolean;
  selectedProvider: string;
  selectedProviderName: string;
  handleStartingCall: () => void;
  text: string;
  setText: (data: string) => void;
  history: AllMessageFormData[];
  disabledButton: boolean;
}

const Chat: React.FC<ChatProps> = ({
  existsCall,
  selectedProvider,
  selectedProviderName,
  handleStartingCall,
  text,
  setText,
  history,
  disabledButton,
}) => {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [history, text]);

  return (
    <Container existsCall={!existsCall} className="Container">
      {selectedProvider ? (
        <Content existsCall={!existsCall}>
          {!existsCall && (
            <ChatHeader>
              <strong>{selectedProviderName}</strong>
              <button
                type="button"
                disabled={disabledButton}
                onClick={handleStartingCall}
              >
                <FiVideo />
              </button>
            </ChatHeader>
          )}

          <ChatBox existsCall={!existsCall} className="Chatbox">
            <Messages history={history} existsCall={existsCall} />
            <div ref={chatRef} style={{ paddingBottom: '0.625rem' }} />
          </ChatBox>

          <InputMessageContainer>
            <InputMessage>
              <Input
                containerStyle={{ borderColor: 'var(--orange)' }}
                type="text"
                name="message"
                placeholder="Digite aqui..."
                value={text}
                onChange={({ target: { value } }) => setText(value)}
              />
              <button type="submit">
                <FiTriangle />
              </button>
            </InputMessage>
          </InputMessageContainer>
        </Content>
      ) : null}
    </Container>
  );
};

export default Chat;
