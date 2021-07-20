import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth, socket } from './auth';
import { useToast } from './toast';

interface Notification {
  id: string;
  count: number;
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

interface MessageContextData {
  providersNewMessage: Notification[];
  updateProvidersNewMessage(providerId: string): Promise<void>;
  history: AllMessageFormData[];
  setHistory(history: AllMessageFormData[]): void;
  lastMessages: AllMessageFormData[] | undefined;
  totalMessages: string;
}

const MessageContext = createContext<MessageContextData>(
  {} as MessageContextData,
);

export const MessageProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const hist = useHistory();

  const user_id = user?.id;

  const [history, setHistory] = useState<AllMessageFormData[]>([]);
  const [lastMessages, setLastMessages] = useState<AllMessageFormData[]>();
  const [providersNewMessage, setProvidersNewMessage] = useState<
    Notification[]
  >([]);

  const [totalMessages, setTotalMessages] = useState<string>('');

  const lastMessagesFormatted = useCallback(
    async (messages: AllMessageFormData[]) => {
      const msgsFormatted = messages.map(msg => {
        let last;
        if (msg.user_id === user_id) {
          last = msg.provider_id;
        }
        if (msg.user_id !== user_id) {
          last = msg.user_id;
        }

        return {
          ...msg,
          last,
        };
      });

      const messageLastFormatted: AllMessageFormData[] = msgsFormatted.filter(
        (msg1, i) => {
          return !msgsFormatted.some(
            (msg2, j) => j < i && msg1.last === msg2.last,
          );
        },
      );

      setLastMessages(messageLastFormatted);
    },
    [user_id],
  );

  useEffect(() => {
    socket.on('lastMessages', (messages: AllMessageFormData[]) => {
      lastMessagesFormatted(messages);
    });
  }, [history, user_id, lastMessagesFormatted]);

  useEffect(() => {
    socket.on('verifiedUserReadMessages', (providerId: string) => {
      if (providerId) {
        socket.emit('verifiedUserReadMessages', providerId);
      }
    });
  }, []);

  useEffect(() => {
    socket.on(
      'newMessage',
      async (
        providerName: string,
        providerId: string,
        count: number,
        text: string,
      ) => {
        socket.emit('userReceivedMessages', providerId, count);

        socket.emit('showLastMessages', user_id);

        if (hist.location.pathname !== '/converse') {
          addToast({
            type: 'message',
            title: `Nova mensagem!`,
            description: `${providerName}: ${text}`,
          });
        }
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('teste', (formatted: Notification[], total: string) => {
      setProvidersNewMessage(formatted);
      setTotalMessages(total);
    });
  }, []);

  const updateProvidersNewMessage = useCallback(
    async (providerId: string) => {
      const newProvidersNewMessage = providersNewMessage.filter(
        prov => prov.id !== providerId,
      );
      console.log(providersNewMessage);
      setProvidersNewMessage(newProvidersNewMessage);
    },
    [providersNewMessage],
  );

  return (
    <MessageContext.Provider
      value={{
        providersNewMessage,
        updateProvidersNewMessage,
        history,
        setHistory,
        lastMessages,
        totalMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export function useMessage(): MessageContextData {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }

  return context;
}
