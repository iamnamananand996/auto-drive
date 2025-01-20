import { SearchResult } from '../../../../../views/SearchResult';
import { SEARCH_GLOBAL_METADATA_BY_CID_OR_NAME } from '../../../../../services/gql/common/query';
import { createGqlClient } from '../../../../../services/gql';
import { SearchGlobalMetadataByCidOrNameQuery } from '../../../../../../gql/graphql';
import { getNetwork } from '../../../../../constants/networks';

export const dynamic = 'force-dynamic';

export default async function Page({
  params: { chain, cid },
}: {
  params: { chain: string; cid: string };
}) {
  const { gqlUrl } = getNetwork(chain);
  const gqlClient = createGqlClient(gqlUrl);

  const { data } = await gqlClient.query<SearchGlobalMetadataByCidOrNameQuery>({
    query: SEARCH_GLOBAL_METADATA_BY_CID_OR_NAME,
    variables: {
      search: `%${decodeURIComponent(cid)}%`,
      limit: 100,
    },
  });

  const objects = data.metadata.map((metadata) => ({
    type: metadata.type,
    name: metadata.name ?? '',
    size: metadata.size,
    cid: metadata.cid,
  }));

  return <SearchResult objects={objects} />;
}
