import { Profile } from '../../../../views/Profile';
import { GetProfileQueryText } from '../../../../views/Profile/query';
import { GetProfileQuery } from '../../../../../gql/graphql';
import { createGqlClient } from '../../../../services/gql';
import { getNetwork } from '../../../../constants/networks';

const getApiKeysFromResult = (user: GetProfileQuery['users'][number]) => {
  return (user?.api_keys || []).map((apiKey) => ({
    id: apiKey.id,
    oauthProvider: apiKey.oauth_provider,
    oauthUserId: apiKey.oauth_user_id,
    createdAt: new Date(apiKey.created_at),
  }));
};

export const dynamic = 'force-dynamic';

export default async function Page({
  params: { chain },
}: {
  params: { chain: string };
}) {
  const { gqlUrl } = getNetwork(chain);
  const gqlClient = createGqlClient(gqlUrl);

  const { data } = await gqlClient.query<GetProfileQuery>({
    query: GetProfileQueryText,
    variables: {},
    fetchPolicy: 'no-cache',
  });

  const apiKeys = getApiKeysFromResult(data.users[0]);

  return <Profile apiKeys={apiKeys} />;
}
