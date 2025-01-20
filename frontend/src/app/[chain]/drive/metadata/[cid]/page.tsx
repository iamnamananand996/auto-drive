import {
  GetMetadataByHeadCidDocument,
  GetMetadataByHeadCidQuery,
} from '../../../../../../gql/graphql';
import { ObjectDetails } from '../../../../../views/ObjectDetails';
import { createGqlClient } from '../../../../../services/gql';
import { getNetwork } from '../../../../../constants/networks';
import { mapObjectInformationFromQueryResult } from '../../../../../services/gql/utils';

export const dynamic = 'force-dynamic';

export default async function Page({
  params: { chain, cid },
}: {
  params: { chain: string; cid: string };
}) {
  const { gqlUrl } = getNetwork(chain);
  const gqlClient = createGqlClient(gqlUrl);

  const { data } = await gqlClient.query<GetMetadataByHeadCidQuery>({
    query: GetMetadataByHeadCidDocument,
    variables: { headCid: cid },
  });

  const metadata = mapObjectInformationFromQueryResult(data);

  return <ObjectDetails metadata={metadata} />;
}
