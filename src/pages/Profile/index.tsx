import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FiX,
  FiMail,
  FiLock,
  FiUser,
  FiCamera,
  FiTrash2,
  FiAlertCircle,
} from 'react-icons/fi';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import defaultImg from '../../assets/default.svg';
import getValidationErrors from '../../utils/getValidationErros';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Content,
  TrashIcon,
  AvatarEmptyImg,
  AvatarInput,
  Overlay,
  OverlayContainer,
  CheckModal,
  Title,
  Description,
  ButtonOkModal,
  ButtonCloseModal,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { addToast } = useToast();

  const { user, updatedUser, signOut } = useAuth();

  const [isDeletedAccount, setIsDeletedAccount] = useState(false);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Campo obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Campo obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        const response = await api.put('/profile', formData);

        if (response) {
          updatedUser(response.data);

          addToast({
            type: 'success',
            title: 'Perfil atualizado!',
            description:
              'Suas informações do perfil foram atualizados com sucesso.',
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
        });
      }
    },
    [updatedUser, addToast],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      (async () => {
        try {
          if (e.target.files) {
            const data = new FormData();

            data.append('avatar', e.target.files[0]);

            const response = await api.patch('/users/avatar', data);

            if (response) {
              updatedUser(response.data);

              addToast({
                type: 'success',
                title: 'Avatar atualizado!',
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      })();
    },
    [updatedUser, addToast],
  );

  const handleDeleteAccount = useCallback(async () => {
    setIsDeletedAccount(true);
  }, []);

  const handleConfirmDeleteAccount = useCallback(async () => {
    try {
      const response = await api.delete('/profile');

      if (response.data) {
        signOut();

        addToast({
          type: 'success',
          title: 'Conta excluída com sucesso!',
          description: 'Sua conta foi excluída com sucesso.',
        });
      }
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao excluir sua conta',
        description:
          'Ocorreu um erro ao tentar excluir sua conta, tente novamente.',
      });
    }
  }, [addToast, signOut]);

  const handleCloseModalDeleteAccount = useCallback(async () => {
    setIsDeletedAccount(false);

    history.push('/profile');
  }, [history]);

  return (
    <Container>
      <Header />

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} />
            ) : (
              <AvatarEmptyImg>
                <img src={defaultImg} alt={user.name} />
              </AvatarEmptyImg>
            )}

            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>
            Meu perfil
            <TrashIcon>
              <button type="button" onClick={handleDeleteAccount}>
                <FiTrash2 />
              </button>
            </TrashIcon>
          </h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: '1.5rem' }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>

      {isDeletedAccount && (
        <Overlay>
          <OverlayContainer>
            <CheckModal>
              <FiAlertCircle />
            </CheckModal>

            <Title>ATENÇÃO</Title>
            <Description>Tem certeza que deseja excluir sua conta?</Description>

            <ButtonOkModal onClick={handleConfirmDeleteAccount}>
              Sim, eu quero excluir minha conta.
            </ButtonOkModal>

            <ButtonCloseModal onClick={handleCloseModalDeleteAccount}>
              <FiX />
            </ButtonCloseModal>
          </OverlayContainer>
        </Overlay>
      )}
    </Container>
  );
};

export default Profile;
