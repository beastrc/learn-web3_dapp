import {POLKADOT_NETWORKS, POLKADOT_PROTOCOLS} from 'types';

export const getDataHubPolkadotNodeUrl = (
  network: POLKADOT_NETWORKS,
  protocol: POLKADOT_PROTOCOLS,
): string => {
  if (network === POLKADOT_NETWORKS.WESTEND) {
    return protocol === POLKADOT_PROTOCOLS.RPC
      ? `https://${process.env.DATAHUB_POLKADOT_WESTEND_RPC_URL}/apikey/${process.env.DATAHUB_POLKADOT_API_KEY}`
      : `wss://${process.env.DATAHUB_POLKADOT_WESTEND_WS_URL}/apikey/${process.env.DATAHUB_POLKADOT_API_KEY}`;
  } else {
    return protocol === POLKADOT_PROTOCOLS.RPC
      ? `https://${process.env.DATAHUB_POLKADOT_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_POLKADOT_API_KEY}`
      : `wss://${process.env.DATAHUB_POLKADOT_MAINNET_WS_URL}/apikey/${process.env.DATAHUB_POLKADOT_API_KEY}`;
  }
};

export const getSafeUrl = (force = true) =>
  force
    ? 'wss://westend-rpc.polkadot.io'
    : getDataHubPolkadotNodeUrl(
        POLKADOT_NETWORKS.MAINNET,
        POLKADOT_PROTOCOLS.WS,
      );
