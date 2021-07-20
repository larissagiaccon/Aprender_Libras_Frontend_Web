import React, { useEffect, useState } from 'react';
import { FiBell } from 'react-icons/fi';
import api from '../../services/api';
import { useCall } from '../../hooks/call';
import defaultImg from '../../assets/default.svg';

import Search from '../Search';

import {
  Container,
  ContentContainer,
  Content,
  ProviderAvatar,
  AvatarEmptyImg,
  ProviderName,
  ProviderNameAndLastMessages,
  LastMessages,
  Notification,
} from './styles';

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

interface Provider {
  id: string;
  name: string;
  avatar_url: string;
  status: boolean;
}

interface ProvidersProps {
  selectedProvider: string;
  handleSelectProvider: (providerId: string, providerName: string) => void;
  lastMessages?: AllMessageFormData[];
  providersNewMessage?: Notification[];
}

const Providers: React.FC<ProvidersProps> = ({
  selectedProvider,
  handleSelectProvider,
  lastMessages,
  providersNewMessage,
}) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [providersSearch, setProvidersSearch] = useState('');

  const { users } = useCall();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get<Provider[]>('providers');

        const providersFormatted = response.data.map(provider => {
          return {
            ...provider,
            status: !!users.find(user => user.user_id === provider.id),
          };
        });

        setProviders(
          providersFormatted
            .sort((a, b) => a.name.localeCompare(b.name))
            .sort(value => (value.status ? -1 : 1)),
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [users]);

  return (
    <Container>
      <div className="search">
        <Search setProvidersSearch={setProvidersSearch} />
      </div>

      <ContentContainer>
        {providers
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
            <Content
              key={provider.id}
              onClick={() => handleSelectProvider(provider.id, provider.name)}
              selected={provider.id === selectedProvider}
              status={provider?.status}
            >
              <div className="status" />

              <ProviderAvatar>
                {provider.avatar_url ? (
                  <img src={provider.avatar_url} alt={provider.name} />
                ) : (
                  <AvatarEmptyImg>
                    <img src={defaultImg} alt={provider.name} />
                  </AvatarEmptyImg>
                )}
              </ProviderAvatar>

              <ProviderNameAndLastMessages
                selected={provider.id === selectedProvider}
                className="ProviderNameAndLastMessages"
              >
                <ProviderName>{provider.name}</ProviderName>

                {lastMessages?.map(msg =>
                  msg.last === provider.id ? (
                    <LastMessages key={msg.id}>{msg.text}</LastMessages>
                  ) : (
                    <div />
                  ),
                )}
              </ProviderNameAndLastMessages>

              {providersNewMessage?.map(prov =>
                prov.id === provider.id ? (
                  <Notification key={prov.id}>
                    <p>{prov.count}</p>
                    <FiBell />
                  </Notification>
                ) : (
                  <div />
                ),
              )}
            </Content>
          ))}
      </ContentContainer>
    </Container>
  );
};

export default Providers;
