export type Network = {
  gqlUrl: string;
  apiUrl: string;
};

export type NetworkName = keyof typeof networks;

export const networks: Record<string, Network> = {
  mainnet: {
    gqlUrl: process.env.NEXT_PUBLIC_GQL_URL || 'http://localhost:3000',
    apiUrl:
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6565/v1/graphql',
  },
};

export const defaultNetwork = networks.mainnet;

export const getNetwork = (chain: string) => {
  return networks[chain as keyof typeof networks] || defaultNetwork;
};
