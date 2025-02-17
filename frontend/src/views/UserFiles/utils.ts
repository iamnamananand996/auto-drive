import { GetMyFilesQuery } from '../../../gql/graphql';
import { ObjectSummary, OwnerRole } from '../../models/UploadedObjectMetadata';

export const objectSummaryFromUserFilesQuery = (
  e: GetMyFilesQuery,
): ObjectSummary[] => {
  return e.metadata_roots.map((m) => ({
    headCid: m.cid ?? '',
    size: m.size ?? 0,
    owners: m.inner_metadata!.object_ownership.map((o) => ({
      oauthProvider: o.oauth_provider,
      oauthUserId: o.oauth_user_id,
      role: o.is_admin ? OwnerRole.ADMIN : OwnerRole.VIEWER,
    })),
    type: m.type,
    name: m.name,
    mimeType: m.mimeType,
    children: m.children,
    publishedObjectId: m.inner_metadata?.published_objects?.id ?? null,
    createdAt: m.created_at,
    uploadStatus: {
      uploadedNodes: m.inner_metadata!.publishedNodes.aggregate?.count ?? 0,
      archivedNodes: m.inner_metadata!.archivedNodes.aggregate?.count ?? 0,
      totalNodes: m.inner_metadata!.totalNodes.aggregate?.count ?? 0,
      minimumBlockDepth:
        m.inner_metadata!.minimumBlockDepth?.[0]?.block_published_on ?? null,
      maximumBlockDepth:
        m.inner_metadata!.maximumBlockDepth?.[0]?.block_published_on ?? null,
    },
  }));
};
