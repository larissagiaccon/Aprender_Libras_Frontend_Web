import React, { createContext, useCallback, useContext, useState } from 'react';
import io from 'socket.io-client';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface ConnectionState {
  token: string;
  user: User;
}

interface AuthState {
  token: string;
  user: User;
  socket_id: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  socket_id: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updatedUser(user: User): void;
  refreshToken(): void;
  refreshConnection(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const socket = io(`${process.env.REACT_APP_HOST_API_URL}`, {
  autoConnect: false,
  transports: ['websocket'],
  upgrade: false,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@AprenderLibras:token');
    const user = localStorage.getItem('@AprenderLibras:user');
    const socket_id = localStorage.getItem('@AprenderLibras:socket') || '';

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
        socket_id,
      };
    }

    return {} as AuthState;
  });

  const refreshConnection = useCallback(async () => {
    const token = localStorage.getItem('@AprenderLibras:token');
    const user = localStorage.getItem('@AprenderLibras:user');
    const socket_id = localStorage.getItem('@AprenderLibras:socket') || '';

    if (token && user && socket_id) {
      socket.connect();

      const dataUser = {
        user_id: data.user.id,
      };

      socket.emit('userConnected', dataUser);

      socket.on('me', id => {
        localStorage.setItem('@AprenderLibras:socket', id);
        // console.log('New socket', id);
        setData({ token, user: JSON.parse(user), socket_id: id });
      });
    }
  }, [data]);

  const createConnection = useCallback(({ token, user }: ConnectionState) => {
    localStorage.setItem('@AprenderLibras:token', token);
    localStorage.setItem('@AprenderLibras:user', JSON.stringify(user));

    socket.connect();

    const dataUser = {
      user_id: user.id,
    };

    socket.emit('userToken', token);
    socket.emit('userConnected', dataUser);

    socket.on('me', id => {
      localStorage.setItem('@AprenderLibras:socket', id);

      setData({ token, user, socket_id: id });
    });
  }, []);

  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      // console.log(token);

      createConnection({
        token,
        user,
      });
    },
    [createConnection],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@AprenderLibras:token');
    localStorage.removeItem('@AprenderLibras:user');
    localStorage.removeItem('@AprenderLibras:socket');

    socket.disconnect();

    setData({} as AuthState);
  }, []);

  const updatedUser = useCallback(
    (user: User) => {
      localStorage.setItem('@AprenderLibras:user', JSON.stringify(user));

      setData({ token: data.token, user, socket_id: data.socket_id });
    },
    [data],
  );

  const refreshToken = useCallback(async () => {
    //     // const response = await api.post('/sessions/refresh-token');
    //     // console.log(response);
    //     // const { token } = response.data;
    //     const [, token] = newToken.split(' ');
    //     console.log(token);
    //     localStorage.setItem('@AprenderLibras:token', token);
    //     setData({ token, user: data.user, socket_id: data.socket_id });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        socket_id: data.socket_id,
        signIn,
        signOut,
        updatedUser,
        refreshToken,
        refreshConnection,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
