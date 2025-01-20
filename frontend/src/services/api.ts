import {
  AuthProvider,
  createAutoDriveApi,
  downloadFile,
} from '@autonomys/auto-drive';
import { ApiKey } from '../models/ApiKey';
import {
  SubscriptionGranularity,
  SubscriptionWithUser,
} from '../models/Subscriptions';
import { UploadedObjectMetadata } from '../models/UploadedObjectMetadata';
import { User, UserInfo } from '../models/User';
import { getAuthSession } from '../utils/auth';
import { uploadFileContent } from '../utils/file';
import { getNetwork } from '../constants/networks';

export interface UploadResponse {
  cid: string;
}

export type Api = ReturnType<typeof createApiService>;

export const createApiService = (apiUrl: string) => {
  return {
    getMe: async (): Promise<UserInfo> => {
      const session = await getAuthSession();
      if (!session?.authProvider || !session.accessToken) {
        throw new Error('No session');
      }

      const response = await fetch(`${apiUrl}/users/@me`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'X-Auth-Provider': session.authProvider,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      return response.json();
    },
    getUserList: async (): Promise<SubscriptionWithUser[]> => {
      const session = await getAuthSession();
      if (!session?.authProvider || !session.accessToken) {
        throw new Error('No session');
      }

      const response = await fetch(`${apiUrl}/users/subscriptions/list`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
          'X-Auth-Provider': session.authProvider,
        },
      });
      return response.json();
    },
    deleteApiKey: async (apiKeyId: string): Promise<void> => {
      const session = await getAuthSession();
      if (!session?.authProvider || !session.accessToken) {
        throw new Error('No session');
      }

      const response = await fetch(`${apiUrl}/users/@me/apiKeys/${apiKeyId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'X-Auth-Provider': session.authProvider,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
    },
    uploadFile: async (chain: string, file: File): Promise<UploadResponse> => {
      const session = await getAuthSession();
      if (!session?.authProvider || !session.accessToken) {
        throw new Error('No session');
      }

      const { apiUrl } = getNetwork(chain);

      const response = await fetch(`${apiUrl}/objects/file`, {
        method: 'POST',
        body: JSON.stringify({
          data: await uploadFileContent(file),
          filename: file.name,
          mimeType: file.type,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
          'X-Auth-Provider': session.authProvider,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      return response.json();
    },
    fetchUploadedObjectMetadata: async (
      cid: string,
    ): Promise<UploadedObjectMetadata> => {
      const response = await fetch(`${apiUrl}/objects/${cid}`);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      return response.json();
    },
    downloadObject: async (
      cid: string,
      password?: string,
    ): Promise<AsyncIterable<Buffer>> => {
      const session = await getAuthSession();
      if (!session?.authProvider || !session.accessToken) {
        throw new Error('No session');
      }

      const api = createAutoDriveApi({
        url: apiUrl,
        provider: session.authProvider as AuthProvider,
        apiKey: session.accessToken,
      });

      return downloadFile(api, cid, password);
    },
    generateApiKey: async (): Promise<ApiKey> => {
      const session = await getAuthSession();
      if (!session?.authProvider || !session.accessToken) {
        throw new Error('No session');
      }

      const response = await fetch(`${apiUrl}/users/@me/apiKeys/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'X-Auth-Provider': session.authProvider,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      return response.json();
    },
    shareObject: async (dataCid: string, publicId: string): Promise<void> => {
      const session = await getAuthSession();
      if (!session?.authProvider || !session.accessToken) {
        throw new Error('No session');
      }

      await fetch(`${apiUrl}/objects/${dataCid}/share`, {
        method: 'POST',
        body: JSON.stringify({ publicId }),
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'X-Auth-Provider': session.authProvider,
          'Content-Type': 'application/json',
        },
      });
    },
    markObjectAsDeleted: async (cid: string): Promise<void> => {
      const session = await getAuthSession();
      if (!session?.authProvider || !session.accessToken) {
        throw new Error('No session');
      }

      await fetch(`${apiUrl}/objects/${cid}/delete`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'X-Auth-Provider': session.authProvider,
        },
      });
    },
    restoreObject: async (cid: string): Promise<void> => {
      const session = await getAuthSession();
      if (!session?.authProvider || !session.accessToken) {
        throw new Error('No session');
      }

      const response = await fetch(`${apiUrl}/objects/${cid}/restore`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'X-Auth-Provider': session.authProvider,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
    },
    onboardUser: async (): Promise<User> => {
      const session = await getAuthSession();
      if (!session?.authProvider || !session.accessToken) {
        throw new Error('No session');
      }

      const response = await fetch(`${apiUrl}/users/@me/onboard`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'X-Auth-Provider': session.authProvider,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      return response.json();
    },
    addAdmin: async (publicId: string): Promise<void> => {
      const session = await getAuthSession();
      if (!session?.authProvider || !session.accessToken) {
        throw new Error('No session');
      }

      const response = await fetch(`${apiUrl}/users/admin/add`, {
        method: 'POST',
        body: JSON.stringify({ publicId }),
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'X-Auth-Provider': session.authProvider,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
    },
    removeAdmin: async (publicId: string): Promise<void> => {
      const session = await getAuthSession();
      if (!session?.authProvider || !session.accessToken) {
        throw new Error('No session');
      }

      const response = await fetch(`${apiUrl}/users/admin/remove`, {
        method: 'POST',
        body: JSON.stringify({ publicId }),
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'X-Auth-Provider': session.authProvider,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
    },
    updateSubscription: async (
      publicId: string,
      granularity: SubscriptionGranularity,
      uploadLimit: number,
      downloadLimit: number,
    ): Promise<void> => {
      const session = await getAuthSession();
      if (!session?.authProvider || !session.accessToken) {
        throw new Error('No session');
      }

      const response = await fetch(`${apiUrl}/users/subscriptions/update`, {
        method: 'POST',
        body: JSON.stringify({
          granularity,
          uploadLimit,
          downloadLimit,
          publicId,
        }),
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'X-Auth-Provider': session.authProvider,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
    },
  };
};
