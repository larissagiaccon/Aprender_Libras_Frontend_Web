import { v4 as uuid } from 'uuid';
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import Peer, { Instance } from 'simple-peer';

import { useAuth, socket } from './auth';
import CallContainer from '../components/CallContainer/index';

interface ISocket {
  socket_id: string;
  user_id: string;
}

export interface CallMessage {
  id: string;
  type: 'call' | 'answer' | 'error';
  title: string;
  description?: string;
}

interface ICall {
  userIdFromCall: string;
  userNameFromCall: string;
  userSocketFromCall: string;
  userIdToCall: string;
  userSocketToCall: string;
  signal: string;
  message: string;
}

interface CallContextData {
  addCall(message: Omit<CallMessage, 'id'>): void;
  removeCall(id: string): void;
  myVideo: React.MutableRefObject<HTMLVideoElement>;
  userVideo: React.MutableRefObject<HTMLVideoElement>;
  userIdToCall: string;
  setUserIdToCall(string): void;
  selectedProvider: string;
  setSelectedProvider(string): void;
  selectedProviderName: string;
  setSelectedProviderName(string): void;
  callEnded: boolean;
  existsCall: boolean;
  callAccepted: boolean;
  setStartingCall(boolean): void;
  disabledButton: boolean;
  setDisabledButton(boolean): void;
  callUser(any): void;
  answerCall(): void;
  leaveCall(): void;
  endCall(): void;
  users: ISocket[];
}

const CallContext = createContext<CallContextData>({} as CallContextData);

export const CallProvider: React.FC = ({ children }) => {
  const { user, socket_id, refreshConnection } = useAuth();

  const [messages, setMessages] = useState<CallMessage[]>([]);

  const connectionRef = useRef() as React.MutableRefObject<Instance>;
  const myVideo = useRef() as React.MutableRefObject<HTMLVideoElement>;
  const userVideo = useRef() as React.MutableRefObject<HTMLVideoElement>;

  const [messageCallTo, setMessageCallTo] = useState('');
  const [messageCallFrom, setMessageCallFrom] = useState('');

  const [userIdToCall, setUserIdToCall] = useState('');
  const [socketCaller, setSocketCaller] = useState('');
  const [userIdFromCall, setUserIdFromCall] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedProviderName, setSelectedProviderName] = useState('');
  const [callEnded, setCallEnded] = useState(false);
  const [existsCall, setExistsCall] = useState(false);
  const [, setStartingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState<any>();
  const [streamCall, setStreamCall] = useState<MediaStream>();

  const [disabledButton, setDisabledButton] = useState(false);
  const [users, setUsers] = useState<ISocket[]>([]);

  const addCall = useCallback(
    ({ type, title, description }: Omit<CallMessage, 'id'>) => {
      const id = uuid();

      const call = {
        id,
        type,
        title,
        description,
      };

      setMessages(oldMessages => [...oldMessages, call]);

      return id;
    },
    [],
  );

  const removeCall = useCallback((id: string) => {
    setMessages(state => state?.filter(message => message.id !== id));
  }, []);

  const updatedCall = useCallback(
    (id: string) => {
      setMessages(state =>
        state?.map(msg =>
          msg.id === id
            ? {
                ...msg,
                type: 'error',
                title: 'Chamada de vídeo',
                description: 'Usuário offline',
              }
            : msg,
        ),
      );

      const timer = setTimeout(() => {
        removeCall(id);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    },
    [removeCall],
  );

  useEffect(() => {
    socket.on('users', data => {
      // console.log(data);
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(str => {
        setStreamCall(str);
        if (myVideo.current) {
          myVideo.current.srcObject = str;
        }
      });
  }, [myVideo, setStreamCall, messages]);

  useEffect(() => {
    socket.on('callUser', (data: ICall) => {
      setReceivingCall(true);
      setCallerSignal(data.signal);
      setSocketCaller(data.userSocketFromCall);
      setUserIdFromCall(data.userIdFromCall);
      setSelectedProviderName(data.userNameFromCall);
      setMessageCallFrom(data.message);

      const message = addCall({
        type: 'answer',
        title: 'Chamada de vídeo',
        description: `Recebendo ligação de ${data.userNameFromCall}`,
      });

      setMessageCallTo(message);

      socket.emit('receivedCall', {
        to: data.userIdFromCall,
        from: data.userSocketToCall,
        message,
      });
    });
  }, [addCall]);

  useEffect(() => {
    socket.on('endCall', msg => {
      setReceivingCall(false);
      setStartingCall(false);
      setCallEnded(false);
      setDisabledButton(false);

      removeCall(msg);
    });
  }, [removeCall]);

  const endCall = useCallback(() => {
    setDisabledButton(false);

    if (socketCaller) {
      socket.emit('endCall', {
        to: userIdFromCall,
        from: socket_id,
        message: messageCallFrom,
      });
      setUserIdFromCall('');
    } else {
      socket.emit('endCall', {
        to: userIdToCall,
        from: socket_id,
        message: messageCallTo,
      });
      setUserIdToCall('');
    }
  }, [
    socketCaller,
    messageCallFrom,
    messageCallTo,
    socket_id,
    userIdToCall,
    userIdFromCall,
  ]);

  const callUser = useCallback(
    id => {
      const peer = new Peer({
        initiator: true, // True para par iniciador
        trickle: false,
        stream: streamCall, // Video (Webcam) que será transmitido
      });

      const message = addCall({
        type: 'call',
        title: 'Chamada de vídeo',
        description: `Ligando para ${selectedProviderName}`,
      });

      setMessageCallFrom(message);

      peer.on('error', err => {
        console.log(err);
      });

      peer.on('signal', data => {
        socket.emit('callUser', {
          userIdToCall: id,
          signal: data,
          userIdFromCall: user.id,
          userSocketFromCall: socket_id,
          userNameFromCall: user.name,
          message,
        });

        setUserIdToCall(id);
        setSelectedProvider(id);
      });

      socket.on('callAccepted', data => {
        setCallAccepted(true);
        setExistsCall(true);
        peer.signal(data.signal);

        removeCall(data.message);
      });

      socket.on('receivedCall', msg => {
        setMessageCallTo(msg);
      });

      socket.on('userDisconnected', msg => {
        updatedCall(msg);
      });

      peer.on('stream', str => {
        userVideo.current.srcObject = str;
      });

      connectionRef.current = peer;
    },
    [
      socket_id,
      streamCall,
      user,
      addCall,
      selectedProviderName,
      removeCall,
      updatedCall,
    ],
  );

  const answerCall = useCallback(async () => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: streamCall,
    });

    peer.on('error', err => {
      console.log(err);
    });

    peer.on('signal', data => {
      socket.emit('callAccepted', {
        signal: data,
        to: userIdFromCall,
        from: socket_id,
        message: messageCallFrom,
      });
    });
    peer.on('stream', str => {
      userVideo.current.srcObject = str;
    });

    setCallAccepted(true);
    setExistsCall(true);
    setSelectedProvider(userIdFromCall);

    peer.signal(callerSignal);

    connectionRef.current = peer;
  }, [callerSignal, socket_id, streamCall, userIdFromCall, messageCallFrom]);

  const handleLeavingCall = useCallback(() => {
    connectionRef.current.destroy();

    socket.disconnect();
    refreshConnection();
    window.location.reload();

    const data = {
      user_id: user.id,
    };

    socket.emit('userConnected', data);
  }, [user, refreshConnection]);

  useEffect(() => {
    socket.on('leaveCall', () => {
      setReceivingCall(false);
      setStartingCall(false);
      setExistsCall(false);
      setCallAccepted(false);
      setCallEnded(false);

      handleLeavingCall();
    });
  }, [handleLeavingCall]);

  const leaveCall = useCallback(() => {
    setReceivingCall(false);
    setStartingCall(false);
    setExistsCall(false);
    setCallAccepted(false);
    setCallEnded(false);
    setDisabledButton(false);

    if (socketCaller) {
      socket.emit('leaveCall', { to: userIdFromCall, from: socket_id });
      setUserIdFromCall('');
    } else {
      socket.emit('leaveCall', { to: userIdToCall, from: socket_id });
      setUserIdToCall('');
    }

    handleLeavingCall();
  }, [
    socketCaller,
    socket_id,
    userIdFromCall,
    userIdToCall,
    handleLeavingCall,
  ]);

  return (
    <CallContext.Provider
      value={{
        addCall,
        removeCall,
        myVideo,
        userVideo,
        userIdToCall,
        setUserIdToCall,
        selectedProvider,
        setSelectedProvider,
        selectedProviderName,
        setSelectedProviderName,
        callEnded,
        existsCall,
        callAccepted,
        setStartingCall,
        disabledButton,
        setDisabledButton,
        callUser,
        answerCall,
        leaveCall,
        endCall,
        users,
      }}
    >
      {children}
      <CallContainer messages={messages} />
    </CallContext.Provider>
  );
};

export function useCall(): CallContextData {
  const context = useContext(CallContext);

  if (!context) {
    throw new Error('useCall must be used within a CallProvider');
  }

  return context;
}
