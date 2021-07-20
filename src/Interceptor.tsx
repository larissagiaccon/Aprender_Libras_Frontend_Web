import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import React, { useEffect } from 'react';

import api from './services/api';
import { socket, useAuth } from './hooks/auth';
import { useToast } from './hooks/toast';

interface IResponse {
  status: string;
  message: string;
}

const Interceptor: React.FC = () => {
  const { signOut, refreshToken } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    api.interceptors.request.use(
      async (request: AxiosRequestConfig) => {
        // console.log(request);
        const user = localStorage.getItem('@AprenderLibras:user');
        const token = localStorage.getItem('@AprenderLibras:token');

        socket.emit('userToken', token);

        if (user && token) {
          request.headers.authorization = `Bearer ${token}`;
        }

        return request;
      },
      (err: AxiosError<IResponse>) => {
        console.log(err.response?.data);
      },
    );

    api.interceptors.response.use(
      (response: AxiosResponse) => {
        // console.log('response: ', response);
        if (response?.data?.token && response.config.url !== 'sessions') {
          console.log(response?.data?.token);

          localStorage.setItem('@AprenderLibras:token', response.data.token);

          api.defaults.headers.authorization = `Bearer ${response.data.token}`;
        }

        return response;
      },
      (err: AxiosError<IResponse>) => {
        console.log(err.response?.data.message);

        if (err.response?.data.message.includes('Bearer')) {
          const newToken = err.response?.data.message;

          const [, token] = newToken.split(' ');
          console.log(token);

          localStorage.setItem('@AprenderLibras:token', token);

          api.defaults.headers.authorization = `Bearer ${token}`;

          // refreshToken(err.response?.data.message);
        }

        if (err.response?.data.message === 'Invalid JWT token') {
          signOut();

          addToast({
            type: 'error',
            title: 'Sessão expirada',
            description:
              'Sua sessão foi expirada, é necessário logar novamente.',
          });
        }

        if (err.response?.data.message === 'Email address already used') {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description:
              'O e-mail inserido já está cadastrado, tente novamente.',
          });
        }

        if (err.response?.data.message === 'E-mail already in use') {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description:
              'O e-mail inserido já está sendo utilizado, tente novamente.',
          });
        }

        if (
          err.response?.data.message === 'This appointment is already booked'
        ) {
          addToast({
            type: 'error',
            title: 'Erro ao realizar o agendamento',
            description: 'Esse horário já foi reservado, tente novamente.',
          });
        }

        if (err.response?.data.message === 'User does not exists') {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description:
              'Esse e-mail não está cadastrado no sistema, tente novamente.',
          });
        }
      },
    );
  }, [addToast, signOut, refreshToken]);

  return null;
};

export default Interceptor;
