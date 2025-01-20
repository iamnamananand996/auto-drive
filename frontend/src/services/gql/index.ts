import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAuthSession } from '../../utils/auth';

const authLink = setContext(async (_, { headers }) => {
  const token = await getAuthSession();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.accessToken}` : '',
    },
  };
});

export const createGqlClient = (gqlUrl: string) => {
  const httpLink = createHttpLink({
    uri: gqlUrl,
  });

  return new ApolloClient({
    uri: gqlUrl,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
};
