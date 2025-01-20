import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  defaultNetwork,
  getNetwork,
  Network,
  NetworkName,
} from '../constants/networks';
import { createGqlClient } from '../services/gql';
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import { Api, createApiService } from '../services/api';
import { createDownloadService, DownloadService } from '../services/download';

type ChainContextType = {
  network: Network;
  setNetwork: (network: NetworkName | Network) => void;
  api: Api;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  downloadService: DownloadService;
} | null;

export const ChainContext = createContext<ChainContextType>(null);

export const ChainProvider = ({ children }: { children: React.ReactNode }) => {
  const [network, _setNetwork] = useState(defaultNetwork);

  const apolloClient = useMemo(
    () => createGqlClient(network.gqlUrl),
    [network],
  );

  const api = useMemo(() => createApiService(network.apiUrl), [network]);

  const setNetwork = useCallback(
    (network: NetworkName | Network) => {
      if (typeof network === 'string') {
        _setNetwork(getNetwork(network));
      } else {
        _setNetwork(network);
      }
    },
    [_setNetwork],
  );

  const downloadService = useMemo(() => createDownloadService(api), [api]);

  return (
    <ChainContext.Provider
      value={{ network, setNetwork, api, apolloClient, downloadService }}
    >
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </ChainContext.Provider>
  );
};

export const useChain = () => {
  const context = useContext(ChainContext);
  if (!context) {
    throw new Error('useChain must be used within a ChainProvider');
  }

  return context;
};
