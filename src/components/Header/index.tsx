import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiCalendar,
  FiMenu,
  FiMessageSquare,
  FiPower,
  FiUser,
} from 'react-icons/fi';

import defaultImg from '../../assets/default.svg';
import { useAuth, socket } from '../../hooks/auth';
import { useMessage } from '../../hooks/message';

import {
  Container,
  ContainerContent,
  Profile,
  AvatarEmptyImg,
  Buttons,
  NumberMessages,
} from './styles';

const Header: React.FC = () => {
  const { signOut, user, refreshConnection } = useAuth();
  const { totalMessages } = useMessage();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  useEffect(() => {
    (async () => {
      try {
        if (socket.disconnected) {
          refreshConnection();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [refreshConnection]);

  return (
    <Container>
      <ContainerContent>
        <div className="logo">
          <h2>APRENDER</h2>
          <h2>LIBRAS</h2>
        </div>

        <Profile>
          {user.avatar_url ? (
            <img src={user.avatar_url} alt={user.name} />
          ) : (
            <AvatarEmptyImg>
              <img src={defaultImg} alt={user.name} />
            </AvatarEmptyImg>
          )}

          <div>
            <span>Bem-vindo,</span>
            <Link to="/profile">
              <strong>{user.name}</strong>
            </Link>
          </div>
        </Profile>

        <Buttons>
          <Link to="/dashboard">
            <button type="button">
              <FiCalendar />
            </button>
          </Link>

          <Link to="/listProviders">
            <button type="button">
              <FiMenu />
            </button>
          </Link>

          <Link to="/converse">
            <button type="button">
              <FiMessageSquare />
              {totalMessages && (
                <NumberMessages>{totalMessages}</NumberMessages>
              )}
            </button>
          </Link>

          <Link to="/profile">
            <button type="button">
              <FiUser />
            </button>
          </Link>

          <button type="button" onClick={handleSignOut}>
            <FiPower />
          </button>
        </Buttons>
      </ContainerContent>
    </Container>
  );
};

export default Header;
