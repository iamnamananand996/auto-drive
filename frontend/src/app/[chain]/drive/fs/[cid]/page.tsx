import { FileCard } from '../../../../../components/common/FileCard';
import {
  GetMetadataByHeadCidDocument,
  GetMetadataByHeadCidQuery,
} from '../../../../../../gql/graphql';
import { mapObjectInformationFromQueryResult } from '../../../../../services/gql/utils';
import { createGqlClient } from '../../../../../services/gql';
import { getNetwork } from '../../../../../constants/networks';

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
  if (metadata.metadata.type === 'file') {
    throw new Error('File type not supported');
  }

  return (
    <div className='grid grid-cols-4 gap-4'>
      {metadata.metadata.children.map((metadata) => {
        return <FileCard key={metadata.cid} metadata={metadata} />;
      })}
    </div>
  );
}
