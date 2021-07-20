import React, { useEffect, useState } from 'react';
import { FiCalendar, FiChevronRight, FiClock } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import api from '../../services/api';
import defaultImg from '../../assets/default.svg';

import Header from '../../components/Header';
import Search from '../../components/Search';

import {
  Container,
  ContainerContent,
  ProviderContainer,
  ProviderAvatar,
  AvatarEmptyImg,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const ListProviders: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [providersSearch, setProvidersSearch] = useState('');

  useEffect(() => {
    api.get<Provider[]>('providers').then(response => {
      setProviders(response?.data.sort((a, b) => a.name.localeCompare(b.name)));
    });
  }, []);

  return (
    <Container>
      <Header />

      <div className="search">
        <Search setProvidersSearch={setProvidersSearch} />
      </div>

      <ContainerContent>
        {providers ? (
          providers
            .filter(provider => {
              if (
                provider.name
                  .toLocaleLowerCase()
                  .includes(providersSearch.toLocaleLowerCase())
              ) {
                return provider;
              }
              if (providersSearch === '') {
                return provider;
              }
              return null;
            })
            .map(provider => (
              <ProviderContainer key={provider.id}>
                <ProviderAvatar>
                  {provider.avatar_url ? (
                    <img src={provider.avatar_url} alt={provider.name} />
                  ) : (
                    <AvatarEmptyImg>
                      <img src={defaultImg} alt={provider.name} />
                    </AvatarEmptyImg>
                  )}
                </ProviderAvatar>

                <ProviderInfo>
                  <ProviderName>{provider.name}</ProviderName>

                  <ProviderMeta style={{ marginTop: '0.938rem' }}>
                    <FiCalendar size={14} color="var(--orange)" />
                    <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                  </ProviderMeta>

                  <ProviderMeta>
                    <FiClock size={14} color="var(--orange)" />
                    <ProviderMetaText>8h às 18h</ProviderMetaText>
                  </ProviderMeta>
                </ProviderInfo>

                <Link
                  to={{
                    pathname: `/createAppointment`,
                    state: provider.id,
                  }}
                >
                  Agendar horário
                  <FiChevronRight />
                </Link>
              </ProviderContainer>
            ))
        ) : (
          <h1>Carregando...</h1>
        )}
      </ContainerContent>
    </Container>
  );
};

export default ListProviders;
