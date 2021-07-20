import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { parseISO, subHours } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns-tz';
import { FiX } from 'react-icons/fi';
import { Fab } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

import { useCall } from '../../hooks/call';
import { useAuth, socket } from '../../hooks/auth';
import { useMessage } from '../../hooks/message';

import Chat from '../../components/Chat';
import Header from '../../components/Header';
import Providers from '../../components/Providers';

import {
  Container,
  Content,
  VideoContainer,
  VideoUser,
  VideoOtherUser,
  ButtonX,
  ChatStreamAndVideoUser,
} from './styles';

interface MessageFormData {
  message: string;
}

interface AllMessageFormData {
  id: string;
  user_id: string;
  provider_id: string;
  text: string;
  created_at: string;
  updated_at: string;
  hourFormatted: string;
  last: string;
}

const Converse: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const {
    myVideo,
    userVideo,
    setUserIdToCall,
    setStartingCall,
    selectedProvider,
    setSelectedProvider,
    selectedProviderName,
    setSelectedProviderName,
    callEnded,
    existsCall,
    callAccepted,
    disabledButton,
    setDisabledButton,
    callUser,
    answerCall,
    leaveCall,
  } = useCall();

  const {
    providersNewMessage,
    updateProvidersNewMessage,
    history,
    setHistory,
    lastMessages,
  } = useMessage();

  const [user_id] = useState<string>(user.id);
  const [user_name] = useState<string>(user.name);
  const provider_id = selectedProvider;

  const [text, setText] = useState<string>('');

  const [clickVideo, setClickVideo] = useState(false);

  const location = useLocation();
  const hist = useHistory();

  const messagesFormatted = useCallback(
    async (messages: AllMessageFormData[]) => {
      const msgFormatted: AllMessageFormData[] = messages.map(msg => {
        return {
          ...msg,
          hourFormatted: format(
            subHours(parseISO(msg.created_at), 3),
            'HH:mm',
            {
              locale: ptBR,
              timeZone: 'America/Sao_Paulo',
            },
          ),
        };
      });
      setHistory(
        msgFormatted.sort((a, b) => a.created_at.localeCompare(b.created_at)),
      );
    },
    [setHistory],
  );

  useEffect(() => {
    const data = {
      user_id,
      provider_id,
    };

    socket.emit('userConnected', data);

    socket.on('allMessages', (messages: AllMessageFormData[]) => {
      messagesFormatted(messages);
    });

    socket.on('receiveMessages', (messages: AllMessageFormData[]) => {
      messagesFormatted(messages);
    });
  }, [user_id, provider_id, messagesFormatted]);

  const handleSelectProvider = useCallback(
    async (providerId: string, providerName: string) => {
      setSelectedProvider(providerId);
      setSelectedProviderName(providerName);
      setUserIdToCall(providerId);

      await updateProvidersNewMessage(providerId);

      const data = {
        user_id,
        provider_id: providerId,
      };

      socket.emit('userConnected', data);

      socket.emit('userReadMessages', data);

      socket.on('allMessages', (messages: AllMessageFormData[]) => {
        messagesFormatted(messages);
      });

      socket.on('receiveMessages', (messages: AllMessageFormData[]) => {
        messagesFormatted(messages);
      });
    },
    [
      user_id,
      messagesFormatted,
      setUserIdToCall,
      setSelectedProvider,
      setSelectedProviderName,
      updateProvidersNewMessage,
    ],
  );

  const handleSubmit = useCallback(
    ({ message }: MessageFormData) => {
      const data = {
        user_name,
        user_id,
        provider_id,
        text,
      };

      if (user_id && provider_id && message) {
        socket.emit('userConnected', data);
        socket.on('allMessages', (messages: AllMessageFormData[]) => {
          messagesFormatted(messages);
        });
        setText('');
      }
    },
    [text, user_name, user_id, provider_id, messagesFormatted],
  );

  const handleStartingCall = useCallback(() => {
    callUser(selectedProvider);
    setStartingCall(true);
    setDisabledButton(true);
  }, [callUser, selectedProvider, setStartingCall, setDisabledButton]);

  useEffect(() => {
    if (location.search === '?accept=true') {
      hist.replace('/converse');
      answerCall();
    }
  }, [location, hist, answerCall]);

  return (
    <Container className="Container">
      <Header />

      {callAccepted && !callEnded && (
        <VideoContainer className="VideoContainer">
          <VideoOtherUser className="VideoOtherUser">
            {userVideo ? (
              <video
                className="userVideo"
                playsInline
                muted
                ref={userVideo}
                autoPlay
                onClick={() => {
                  setClickVideo(state => !state);
                }}
              />
            ) : (
              <div />
            )}
          </VideoOtherUser>

          {clickVideo && (
            <ButtonX visible={clickVideo} onClick={leaveCall}>
              <Fab>
                <FiX />
              </Fab>
            </ButtonX>
          )}

          <Form ref={formRef} onSubmit={handleSubmit}>
            <ChatStreamAndVideoUser style={{ width: '23.33rem' }}>
              <VideoUser className="myVideo">
                {myVideo ? (
                  <video
                    className="myVideo"
                    playsInline
                    muted
                    ref={myVideo}
                    autoPlay
                  />
                ) : (
                  <div />
                )}
              </VideoUser>
              <Chat
                existsCall={existsCall}
                selectedProvider={selectedProvider}
                selectedProviderName={selectedProviderName}
                handleStartingCall={handleStartingCall}
                text={text}
                setText={setText}
                history={history}
                disabledButton={disabledButton}
              />
            </ChatStreamAndVideoUser>
          </Form>
        </VideoContainer>
      )}

      {!existsCall && (
        <Content>
          <Providers
            selectedProvider={selectedProvider}
            handleSelectProvider={handleSelectProvider}
            lastMessages={lastMessages}
            providersNewMessage={providersNewMessage}
          />

          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            style={{ left: '46.91rem' }}
          >
            <Chat
              existsCall={existsCall}
              selectedProvider={selectedProvider}
              selectedProviderName={selectedProviderName}
              handleStartingCall={handleStartingCall}
              text={text}
              setText={setText}
              history={history}
              disabledButton={disabledButton}
            />
          </Form>
        </Content>
      )}
    </Container>
  );
};

export default Converse;
