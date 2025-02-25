import { gql } from '@apollo/client';

export const GetProfileQueryText = gql`
  query GetProfile {
    users {
      public_id
      oauth_user_id
      oauth_provider
      api_keys(where: { deleted_at: { _is_null: true } }) {
        id
        oauth_user_id
        oauth_provider
        created_at
        deleted_at
      }
    }
  }
`;
